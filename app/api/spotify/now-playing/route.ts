import { NextResponse } from "next/server";
import { getNowPlaying } from "@/app/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getNowPlaying();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=20, stale-while-revalidate=60",
      },
    });
  } catch {
    // a failed token or API call is an error, not "nothing playing"
    return NextResponse.json({ isPlaying: false }, { status: 502 });
  }
}
