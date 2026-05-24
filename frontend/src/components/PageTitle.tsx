import type { ReactNode } from "react";

export function PageTitle({ title, intro, crumb }: { title: string; intro: string; crumb: ReactNode }) {
  return (
    <section className="page-title">
      <div className="container">
        <p className="breadcrumbs">{crumb}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}
