import { NextResponse } from "next/server";
import { uploadDocumentWithToken } from "@/lib/cms/strapi-admin";
import { isAdminUploadEnabled } from "@/lib/env";

export async function POST(request: Request) {
  if (!isAdminUploadEnabled()) {
    return NextResponse.json(
      {
        error:
          "Admin upload is not configured. Set STRAPI_API_TOKEN on the server (Vercel or .env.local)."
      },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const result = await uploadDocumentWithToken(formData);
    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    const status =
      message.includes("not configured") || message.includes("Missing") ? 400 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
