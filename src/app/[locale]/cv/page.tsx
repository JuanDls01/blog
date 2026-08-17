import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// /cv used to be an interstitial download page; keep the URL alive for old links
export default function CvPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(getPathname({ href: "/cv/download", locale }));
}
