import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://socionics-jp-paradox.vercel.app"),

  title: "ソシオニクス J/P ねじれ診断",
  description: "MBTIとソシオニクスのJ/Pのズレを体験する診断",

  openGraph: {
    title: "ソシオニクス J/P ねじれ診断",
    description: "MBTIとソシオニクスのJ/Pのズレを体験する診断",
    url: "https://socionics-jp-paradox.vercel.app/",
    siteName: "ソシオニクス J/P ねじれ診断",
    images: [
      {
        url: "https://socionics-jp-paradox.vercel.app/ogp.png",
        width: 1200,
        height: 630,
        alt: "ソシオニクス J/P ねじれ診断",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ソシオニクス J/P ねじれ診断",
    description: "MBTIとソシオニクスのJ/Pのズレを体験する診断",
    images: ["https://socionics-jp-paradox.vercel.app/ogp.png"],
  },
};
