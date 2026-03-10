import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();   // 👈 await lagana zaruri
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return <>{children}</>;
}