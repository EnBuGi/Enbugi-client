import * as React from "react";
import { cn } from "@/shared/utils/cn";

export type ListProps = React.HTMLAttributes<HTMLDivElement> & {

    empty?: React.ReactNode;
    isEmpty?: boolean;
    divider?: boolean;

    spacing?: "sm" | "md" | "lg";
};

const spacingClass: Record<NonNullable<ListProps["spacing"]>, string> = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
};

export function List({
    className,
    children,
    empty,
    isEmpty,
    divider = false,
    spacing = "md",
    ...props
}: ListProps) {
    const hasChildren = React.Children.count(children) > 0;
    const showEmpty = isEmpty ?? !hasChildren;

    return (
        <div
            className={cn(
                "flex w-full flex-col",
                divider ? "divide-y divide-white/5" : spacingClass[spacing],
                className
            )}
            {...props}
        >
            {showEmpty ? (
                empty ?? (
                    <div className="rounded-lg border border-white/5 bg-surface p-6 text-sm text-white/60">
                        표시할 항목이 없습니다.
                    </div>
                )
            ) : (
                children
            )}
        </div>
    );
}
