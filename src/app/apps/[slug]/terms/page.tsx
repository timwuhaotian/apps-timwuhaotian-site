import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell, PolicyArticle } from "../AppShell";
import { apps, getAppBySlug, getPolicyPage } from "@/content/apps";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const app = getAppBySlug((await params).slug);

  return app
    ? {
        title: `${app.name} Terms of Use`,
        description: `Terms of use for ${app.name}.`,
        robots: { index: true, follow: true },
      }
    : {};
}

export default async function TermsPage({ params }: PageProps) {
  const app = getAppBySlug((await params).slug);

  if (!app) {
    notFound();
  }

  const policy = getPolicyPage(app, "terms");

  return (
    <AppShell app={app}>
      <PolicyArticle app={app} kind="terms" policy={policy} />
    </AppShell>
  );
}
