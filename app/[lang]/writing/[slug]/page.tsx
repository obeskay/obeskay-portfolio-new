import { redirect } from "next/navigation";
import { isLang, type Lang } from "../../../../lib/i18n";

export default async function WritingDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = isLang(rawLang) ? rawLang : "es";
  redirect(`/${lang}#perfil`);
}
