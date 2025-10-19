import LoginForm from "./_components/login-form";
import { edwardian } from "@fonts";
import { getTranslations } from "next-intl/server";
import { cn } from "@lib/utils/cn.utils";
import { Link } from "@/i18n/navigation";

export default async function Page() {
  const t = await getTranslations("login");
  return (
   
    <main className="flex items-center justify-center min-h-screen dark:bg-zinc-800">
      <div className="max-w-[29rem] space-y-10">
        {/* Headline */}
        <h1 className={cn(edwardian.className, "text-5xl text-center text-maroon-700 mb-4 dark:text-softpink-30")}> {t("title")}</h1>

        {/* Login form */}
        <LoginForm/>

        {/* Register */}
        <p className="font-medium text-sm text-zinc-800 text-center dark:text-zinc-50">
           {t("noAccount")}  &nbsp;
          <Link href="/register" className="font-bold text-sm text-maroon-700 dark:text-softpink-300">
            {t("createNow")}
          </Link>
        </p>
      </div>
    </main>
  )
}
