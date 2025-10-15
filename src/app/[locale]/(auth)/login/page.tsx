import Link from "next/link";
import LoginForm from "./_components/login-form";

export default function Page() {
  return (
    <main className="flex items-center justify-center">
      <div className="max-w-[29rem] space-y-10">
        {/* headline */}
        <h1 className="font-normal text-5xl text-center">Welcome back!</h1>
        {/* login form */}
        <LoginForm/>
        {/* register */}
        <p className="font-medium text-sm text-zinc-800 text-center border-t border-zinc-200 pt-5">
          Don&apos;t have an account yet? &nbsp;
          <Link href="/register" className="font-bold text-sm text-maroon-700">
             Create one now!
          </Link>
        </p>

   
      </div>
    </main>
  )
}
