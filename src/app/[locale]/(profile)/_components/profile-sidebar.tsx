"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Lock, UserPen } from "lucide-react";
import { cn } from "@lib/utils/cn.util";
import { Button } from "@components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "@i18n/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function ProfileSidebar() {
  // Routing
  const pathname = usePathname();
  const router = useRouter();

  // Translation
  const t = useTranslations("profile");

  // Get pathname without locale
  const cleanedPathname = pathname.replace(/^\/(en|ar)/, "");

  const links = [
    { href: "/profile", label: t("my-account"), icon: UserPen },
    { href: "/change-password", label: t("change-password"), icon: Lock },
  ];

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false }); // sign out without automatic redirect
      toast.success(t("logged-out-successfully")); // show toast
      router.push("/login"); // redirect to login page
    } catch (error) {
      toast.error(t("logout-failed")); // show error toast if failed
    }
  };

  return (
    <section>
      <h1 className="capitalize text-5xl font-bold text-zinc-800 mb-9">{t("update-profile")}</h1>
      <nav className="flex flex-col gap-4 min-h-[66vh] bg-zinc-50 border border-zinc-100 rounded-lg p-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors",
              cleanedPathname === href
                ? "bg-zinc-800 text-white"
                : "text-zinc-800 hover:bg-zinc-800 hover:text-white"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}

        {/* Logout button */}
          <Button
          variant="ghost"
          className="flex items-center justify-start gap-2 w-full rounded-md px-3 py-2 text-base font-medium 
            text-maroon-500 bg-zinc-100 hover:bg-red-50 hover:text-maroon-600 transition-colors mt-auto "
          onClick={handleLogout}
          >
          <LogOut className="w-4 h-4" />
            {t("logout")}
          </Button>
      </nav>
    </section>
  );
}