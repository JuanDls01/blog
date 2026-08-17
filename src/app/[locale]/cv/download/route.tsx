import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { routing } from "@/i18n/routing";
import { getCvContent } from "@/lib/cv/data";
import { CvDocument } from "@/lib/cv/pdf-document";

export const runtime = "nodejs";
// force-dynamic in dev so CV edits show up on every download; static (pre-rendered) in prod
export const dynamic =
  process.env.NODE_ENV === "development" ? "force-dynamic" : "force-static";

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: { locale: string } },
) {
  const { locale } = params;
  if (!routing.locales.includes(locale as Locale)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const content = await getCvContent(locale);
  const buffer = await renderToBuffer(<CvDocument content={content} locale={locale} />);
  const filename = `JuanDelosSantos-CV-${locale}.pdf`;

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control":
        process.env.NODE_ENV === "development"
          ? "no-store"
          : "public, max-age=3600, immutable",
    },
  });
}
