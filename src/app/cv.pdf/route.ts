import { NextResponse } from "next/server";

// TODO: Replace with official cv.pdf in /public/cv.pdf
export async function GET() {
  return new NextResponse(
    "Curriculum Vitae placeholder — official cv.pdf pending upload to /public/cv.pdf.",
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}
