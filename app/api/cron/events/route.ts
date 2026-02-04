export const runtime = "nodejs";

import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import connectDB from "@/lib/mongodb";
import Event from "@/lib/schemas/event";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(process.env.SOURCE_URL!, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await page.waitForSelector(".card");

    const events = await page.evaluate(() => {
      return [...document.querySelectorAll(".card")]
        .slice(0, 9)
        .map((card) => ({
          title: card.querySelector(".title")?.textContent?.trim(),
          date: card.querySelector(".crop-text-1")?.textContent?.trim(),
          description: card.querySelector(".content")?.textContent?.trim(),
          image: card.querySelector("img")?.src,
          link: card.querySelector("a")?.href,
          venue: card.querySelector(".mylinks")?.textContent?.trim(),
        }));
    });

    await Event.deleteMany({});
    await Event.insertMany(events);

    await browser.close();

    return NextResponse.json({
      success: true,
      count: events.length,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
