import { ReactNode } from "react";
import "@app/globals.css"
import ProfileSidebar from "./_components/profile-sidebar";


export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex gap-6 py-8">
      {/* Sidebar */}
      <aside className="w-1/4">
        <ProfileSidebar />
      </aside>

      {/* Main content */}
      <main className="w-3/4 p-4 mt-9">
        {children}
      </main>
    </div>
  );
}
