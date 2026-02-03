"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

export type NavItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export type GnbProps = {
  variant?: "header" | "sidebar";
  items: NavItem[];
  sections?: Array<{ title?: string; items: NavItem[] }>;
  activeHref?: string;
};

export function Gnb({ variant = "header", items, sections, activeHref }: GnbProps) {
  const pathname = usePathname();
  const currentPath = activeHref ?? pathname;
  const isHeader = variant === "header";

  if (isHeader) {
    const hasActive = items.some((item) =>
      item.href === "/" ? currentPath === "/" : currentPath?.startsWith(item.href)
    );

    return (
      <nav className="flex items-center gap-4 pl-4 border-l border-white/10">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? currentPath === "/"
              : currentPath?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 relative h-16",
                hasActive && !active ? "opacity-50" : "",
                active
                  ? "text-white hover:bg-white/10 border-b-2 border-primary"
                  : "text-sub hover:text-white hover:bg-surface/70"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  // Sidebar variant
  const hasActive = sections
    ? sections.some((section) =>
      section.items.some((item) =>
        item.href === "/" ? currentPath === "/" : currentPath?.startsWith(item.href)
      )
    )
    : items.some((item) =>
      item.href === "/" ? currentPath === "/" : currentPath?.startsWith(item.href)
    );

  return (
    <nav className="flex flex-col gap-6 py-4">
      {sections ? (
        sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            {section.title && (
              <h3 className="text-xs font-semibold text-muted uppercase tracking-wider px-3">
                {section.title}
              </h3>
            )}
            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const active =
                  item.href === "/"
                    ? currentPath === "/"
                    : currentPath?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-r-md transition-all duration-200 relative",
                      hasActive && !active ? "opacity-50" : "",
                      active
                        ? "text-white border-l-2 border-primary pl-2.5 hover:bg-white/10"
                        : "text-sub hover:text-white hover:bg-surface/70"
                    )}
                  >
                    {item.icon && (
                      <span className="text-muted hover:text-white transition">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-1">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? currentPath === "/"
                : currentPath?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-r-md transition-all duration-200 relative",
                  hasActive && !active ? "opacity-50" : "",
                  active
                    ? "text-white border-l-2 border-primary pl-2.5 hover:bg-white/10"
                    : "text-sub hover:text-white hover:bg-surface/70"
                )}
              >
                {item.icon && (
                  <span className="text-muted hover:text-white transition">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
