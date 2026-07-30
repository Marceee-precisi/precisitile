import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/quotes/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/quotes");
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-24 md:px-8 md:pt-28">
      <p className="text-[0.7rem] font-medium tracking-[0.22em] text-cyan uppercase">
        Precisi
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-5xl">
        Quote dashboard
      </h1>
      <p className="mt-3 max-w-xl text-ink-muted">
        Private login for reviewing quote requests. Not linked from the public
        site.
      </p>
      <div className="mt-10">
        <AdminLoginForm />
      </div>
    </div>
  );
}
