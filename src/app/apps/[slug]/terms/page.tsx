import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell, PolicyArticle } from "../AppShell";
import { apps, getAppBySlug, getPolicyPage } from "@/content/apps";
import { getAppMetadata } from "@/content/seo";

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

  return app ? getAppMetadata(app, "terms") : {};
}

export default async function TermsPage({ params }: PageProps) {
  const app = getAppBySlug((await params).slug);

  if (!app) {
    notFound();
  }

  const policy = getPolicyPage(app, "terms");

  return (
    <AppShell app={app} currentPage="terms">
      <PolicyArticle app={app} policy={policy} />
    </AppShell>
  );
}
