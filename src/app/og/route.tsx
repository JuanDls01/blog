import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Juan De los Santos";

  const [geist, geistMono, photo] = await Promise.all([
    readFile(join(process.cwd(), "src/app/og/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "src/app/og/GeistMono-Regular.ttf")),
    readFile(join(process.cwd(), "public/me.jpg")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111110",
          padding: "72px 80px",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 48,
          }}
        >
          <h1
            style={{
              fontSize: 62,
              lineHeight: 1.15,
              color: "#ededea",
              letterSpacing: "-0.03em",
              maxWidth: 780,
              margin: 0,
            }}
          >
            {title}
          </h1>
          <img
            src={`data:image/jpeg;base64,${photo.toString("base64")}`}
            width={168}
            height={168}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #3ecfae",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 6,
              height: 32,
              backgroundColor: "#3ecfae",
            }}
          />
          <span
            style={{
              fontFamily: "Geist Mono",
              fontSize: 30,
              color: "#3ecfae",
            }}
          >
            juanidls.dev →
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: geist, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );
}
