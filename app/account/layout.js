import SideNavigation from "@/app/_components/SideNavigation";

// Layout component
export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <SideNavigation />
      </div>
      
      <div className="flex-1 py-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
