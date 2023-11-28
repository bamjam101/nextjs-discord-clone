import NavigationSidebar from "@/components/navigation/NavigationSidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-full">
      <aside className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </aside>
      <main className="md:pl-[72px] h-full">{children}</main>
    </section>
  );
};

export default MainLayout;
