import { ReactNode } from "react";
import "@app/globals.css"
import ProfileSidebar from "./_components/profile-sidebar";
import Header from "@components/layout/header";
import Footer from "@components/layout/footer";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* Wrapper for sidebar + content */}
      <div className="container mx-auto flex gap-6 py-8 flex-1">
        
        {/* Sidebar */}
        <aside className="w-1/4">
          <ProfileSidebar />
        </aside>

        {/* Main content */}
        <div className="w-3/4 p-4">
          {children}
        </div>

      </div>

      <Footer />
    </main>
  );
}
