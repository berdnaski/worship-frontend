import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="items-center justify-center bg-background text-foreground">
        <Outlet />
      </main>
    </div>
  );
}
