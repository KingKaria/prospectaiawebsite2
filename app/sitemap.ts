import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

const routes = [
  "",
  "/sobre",
  "/servicos",
  "/solucoes",
  "/contacto",
  "/politica-de-privacidade",
  "/termos-e-condicoes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
