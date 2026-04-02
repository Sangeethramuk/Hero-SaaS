"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGradingStore } from "@/lib/store/useGradingStore";
import {
  House, Shield, CircleExclamation,
} from "@gravity-ui/icons";

export function Sidebar() {
  const pathname = usePathname();
  const store = useGradingStore();
  
  const pendingAppealsCount = store.getAppealsForAssignment().filter(a => a.appeal?.status === 'Pending').length;

  const navItems = [
    { href: "/assignments", icon: House, label: "Home" },
    { href: "/appeals", icon: CircleExclamation, label: "Appeals", badge: pendingAppealsCount },
    { href: "/audit", icon: Shield, label: "Audit" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-[100] flex h-screen w-20 flex-col items-center border-r border-border/40 bg-surface/50 backdrop-blur-xl py-6">
      {/* Brand Icon */}
      <Link href="/assignments">
        <div className="mb-8 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/80 text-white shadow-md shadow-accent/20 cursor-pointer text-lg font-bold">
          E
        </div>
      </Link>

      {/* Nav Links */}
      <nav className="flex flex-1 flex-col items-center gap-1 w-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          
          return (
               <Link
                 key={item.href}
                 href={item.href}
                 className={`relative flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-all w-full
                  ${isActive
                    ? "bg-accent/20 text-accent shadow-sm"
                    : "text-muted-foreground hover:bg-default/40 hover:text-foreground"
                  }`}
               >
                 <item.icon className="size-5" />
                 <span className="text-[10px] font-medium leading-tight text-center">{item.label}</span>
                 {item.badge && item.badge > 0 && (
                   <span className="absolute top-1 right-1 size-4 flex items-center justify-center bg-danger text-white text-[8px] font-bold rounded-full">
                     {item.badge > 9 ? '9+' : item.badge}
                   </span>
                 )}
               </Link>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="mt-auto flex flex-col items-center gap-4">
          <AvatarPlaceholder />
      </div>
    </aside>
  );
}

const AvatarPlaceholder = () => (
   <div className="size-8 rounded-full border border-border/60 bg-default/40 flex items-center justify-center text-[10px] font-bold text-muted-foreground cursor-pointer hover:border-border transition-colors">
      SK
   </div>
)
