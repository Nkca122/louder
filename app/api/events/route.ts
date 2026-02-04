import connectDB from "@/lib/mongodb";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { NextResponse } from "next/server";
import Event from "@/lib/schemas/event";

const SOURCE_URL = process.env.NEXT_PUBLIC_SOURCE_URL;

export async function GET() {
  if (!SOURCE_URL) {
    return NextResponse.json(
      {
        success: false,
        error: "SOURCE_URL missing",
      },
      { status: 500 },
    );
  }
  let browser;

  try {
    await connectDB();
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
    });

    const page = await browser.newPage();

    await page.goto(`${SOURCE_URL}`, {
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

    return NextResponse.json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal Server error occured",
      },
      { status: 500 },
    );
  } finally {
    if (browser) await browser.close();
  }
}
