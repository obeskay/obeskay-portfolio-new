import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Senior Software Engineer based in Mexico City. Building AI products that solve real problems. Currently at WOOW Todo Bien.",
  openGraph: {
    title: "About | Obed Vargas",
    description: "Senior Software Engineer building AI products that solve real problems.",
    images: ["/api/og?title=About&subtitle=Building AI products that work"],
  },
};
