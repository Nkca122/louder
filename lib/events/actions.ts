export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import connectDB from "@/lib/mongodb";
import Event from "@/lib/schemas/event";
import { unstable_cache } from "next/cache";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";


const SOURCE_URL = process.env.NEXT_PUBLIC_SOURCE_URL;
const executablePath =
  process.env.NODE_ENV === "production"
    ? await chromium.executablePath()
    : undefined;

async function scrapeAndStoreEvents() {
  if (!SOURCE_URL) {
    throw new Error("SOURCE_URL missing");
  }

  await connectDB();

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.goto(SOURCE_URL, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector(".card");

    const events = await page.evaluate(() => {
      const cards = document.querySelectorAll(".card");

      return Array.from(cards)
        .map((card) => {
          const title =
            card.querySelector(".title")?.textContent?.trim() || null;

          const spans = card.querySelectorAll(".crop-text-1");
          const date = spans.length ? spans[0]?.textContent?.trim() : null;

          const description =
            card.querySelector(".content")?.textContent?.trim() || null;

          const image = card.querySelector("img")?.src || null;
          const link = card.querySelector("a")?.href || null;

          const venue =
            card.querySelector(".mylinks")?.textContent?.trim() || null;

          return {
            title,
            date,
            venue,
            description,
            link,
            image,
          };
        })
        .slice(0, 9);
    });
    await Event.insertMany(events);

    return events;
  } finally {
    await browser.close();
  }
}

export const getEvents = unstable_cache(
  async () => {
    return await scrapeAndStoreEvents();
  },
  ["events"],
  {
    revalidate: 120,
  }
);
