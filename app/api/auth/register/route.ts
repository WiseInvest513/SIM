import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ error: "本站已改用 Wise ID，请前往登录页面。" }, { status: 410 }); }
