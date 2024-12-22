import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {


    try {
      const data = await req.json();
      const filePath = path.join(process.cwd(), "public", "dummy_food_data.json");
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      return NextResponse.json(
        { message: "Data saved successfully!"},
        { status: 200 },
      );
    } catch (e) {
        return NextResponse.json(
          { message: 'Internal server error' },
          { status: 500 },
        );
    }
}
