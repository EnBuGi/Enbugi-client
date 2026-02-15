import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { Badge } from "./Badge";

export type TagBadgeProps = {
    label: string;
    className?: string;
};

export function TagBadge({ label, className }: TagBadgeProps) {
    return (
        <Badge
            intent="neutral"
            tone="solid"
            size="sm"
            shape="rounded"
            hasBorder={true}
            className={cn(
                "bg-white/[0.03] text-white/85 border-white/40",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.55)]",
                "tracking-[0.12em] uppercase",
                className
            )}
        >
            {label}
        </Badge>
    );
}
