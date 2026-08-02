import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Juan De los Santos";

  const [geist, geistMono, photo, dino] = await Promise.all([
    readFile(join(process.cwd(), "src/app/og/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "src/app/og/GeistMono-Regular.ttf")),
    readFile(join(process.cwd(), "public/me.jpg")),
    readFile(join(process.cwd(), "public/pixels/dino-night.png")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#000000",
          fontFamily: "Geist",
        }}
      >
        <img
          src={`data:image/png;base64,${dino.toString("base64")}`}
          width={1200}
          height={352}
          style={{ position: "absolute", bottom: 0, left: 0 }}
        />
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 80,
            right: 80,
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
              border: "3px solid #ededea",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 96,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 6,
              height: 32,
              backgroundColor: "#ededea",
            }}
          />
          <span
            style={{
              fontFamily: "Geist Mono",
              fontSize: 30,
              color: "#ededea",
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
