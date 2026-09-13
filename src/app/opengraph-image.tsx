import { ImageResponse } from "next/og";
import { projects, stats } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Abudora, nine products in one summer";

/*
 * Satori, which renders this, needs an explicit display on every element that
 * has more than one child. Missing one fails the build rather than degrading,
 * so they are all spelled out.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0908",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#d9a441",
              marginRight: 14,
            }}
          />
          <div
            style={{
              color: "#d9a441",
              fontSize: 22,
              letterSpacing: 6,
            }}
          >
            ABUDORA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f3ede3", fontSize: 70, lineHeight: 1.08 }}>
            A full stack developer
          </div>
          <div style={{ color: "#f3ede3", fontSize: 70, lineHeight: 1.08 }}>
            with a shipping problem.
          </div>
          <div
            style={{
              color: "rgba(243,237,227,0.55)",
              fontSize: 27,
              marginTop: 28,
            }}
          >
            {`${stats.commits} commits across ${stats.projects} deployed products`}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          {projects.map((p) => (
            <div
              key={p.slug}
              style={{
                flex: 1,
                height: 8,
                borderRadius: 999,
                background: p.accent,
                marginRight: 10,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size
  );
}
