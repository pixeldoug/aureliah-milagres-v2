import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Aureliah Milagres — cantora e compositora";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const poster = await readFile(join(process.cwd(), "public/video/hero-poster.jpg"));
  const posterSrc = `data:image/jpeg;base64,${poster.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#1f2121",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
            objectPosition: "center 18%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(31,33,33,0.82) 0%, rgba(31,33,33,0.38) 42%, rgba(31,33,33,0) 72%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 80px",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.92,
              marginBottom: 18,
            }}
          >
            Cantora + compositora
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              fontWeight: 600,
              lineHeight: 0.88,
              letterSpacing: "-0.045em",
              textTransform: "uppercase",
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
            }}
          >
            <span>Aureliah</span>
            <span>Milagres</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
