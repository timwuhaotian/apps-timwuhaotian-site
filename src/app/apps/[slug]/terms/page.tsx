import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "../AppShell";
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
      <PolicyArticle policy={policy} />
    </AppShell>
  );
}

function PolicyArticle({
  policy,
}: {
  policy: ReturnType<typeof getPolicyPage>;
}) {
  return (
    <article className="max-w-3xl space-y-8">
      <header>
        <p className="text-sm font-medium text-zinc-500">
          Updated {policy.updatedAt}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal">
          {policy.title}
        </h2>
      </header>

      {policy.sections.map((section) => (
        <section className="space-y-3" key={section.heading}>
          <h3 className="text-lg font-semibold">{section.heading}</h3>
          <p className="leading-7 text-zinc-700">{section.body}</p>
        </section>
      ))}
    </article>
  );
}
