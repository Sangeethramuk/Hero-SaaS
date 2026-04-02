"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGradingStore } from "@/lib/store/useGradingStore";
import { LayoutList, ListCheck, SquareHashtag, ChartLine, Shield, CircleExclamation } from "@gravity-ui/icons";

interface Tab {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function AssignmentTabs() {
  const pathname = usePathname();
  const store = useGradingStore();
  const currentAssignment = store.getCurrentAssignment();
  
  // Only show tabs when we're in an assignment context
  if (!currentAssignment) return null;
  
  const assignmentId = currentAssignment.id;
  
  const assignmentAppealsCount = store.getAppealsForAssignment(assignmentId).filter(a => a.appeal?.status === 'Pending').length;

  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      href: `/assignments/${assignmentId}`,
      icon: LayoutList,
    },
    {
      id: "grading",
      label: "Grading",
      href: `/assignments/${assignmentId}/grading`,
      icon: ListCheck,
    },
    {
      id: "feedback",
      label: "Feedback",
      href: `/assignments/${assignmentId}/feedback`,
      icon: SquareHashtag,
    },
    {
      id: "analytics",
      label: "Analytics",
      href: `/assignments/${assignmentId}/analytics`,
      icon: ChartLine,
    },
    {
      id: "appeals",
      label: assignmentAppealsCount > 0 ? `Appeals (${assignmentAppealsCount})` : "Appeals",
      href: "/appeals",
      icon: CircleExclamation,
    },
    {
      id: "audit",
      label: "Audit",
      href: `/assignments/${assignmentId}/audit`,
      icon: Shield,
    },
  ];
  
  // Check if current path matches any assignment route
  const isAssignmentRoute = pathname.startsWith(`/assignments/${assignmentId}`);
  if (!isAssignmentRoute) return null;
  
  return (
    <div className="border-b border-border/40 bg-surface/50 backdrop-blur-xl">
      <div className="px-8 py-3">
        <div className="flex items-center gap-6">
          {/* Assignment Name */}
          <div className="flex items-center gap-2 pr-6 border-r border-border/40">
            <span className="text-sm font-semibold text-foreground truncate max-w-[200px]">
              {currentAssignment.title}
            </span>
          </div>
          
          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              // Check if this tab is active
              const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
              
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? "bg-accent/10 text-accent shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-default/40"
                    }
                  `}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
