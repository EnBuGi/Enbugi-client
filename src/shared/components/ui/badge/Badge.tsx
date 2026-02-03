import * as React from "react";
import { cn } from "@/shared/utils/cn";

export type BadgeIntent = "neutral" | "success" | "danger" | "warning";
export type BadgeTone = "soft" | "outline" | "solid";
export type BadgeSize = "sm" | "md";
export type BadgeShape = "rounded" | "pill";
export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
    intent?: BadgeIntent;
    tone?: BadgeTone;
    size?: BadgeSize;
    shape?: BadgeShape;
    hasBorder?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "leading" | "trailing";
    truncate?: boolean;
    useRing?: boolean;
};

const base =
    "inline-flex items-center gap-2 select-none whitespace-nowrap font-mono font-semibold";

const sizeStyles: Record<BadgeSize, string> = {
    sm: "h-8 px-3 text-[12px] tracking-wide",
    md: "h-9 px-3.5 text-[13px] tracking-wide",
};

const shapeStyles: Record<BadgeShape, string> = {
    rounded: "rounded-lg",
    pill: "rounded-full",
};

function intentStyles(intent: BadgeIntent, tone: BadgeTone) {
    const map = {
        neutral: {
            soft: "bg-white/5 text-white/80 border-white/20",
            outline: "bg-transparent text-white/80 border-white/40",
            solid: "bg-white/15 text-white border-white/30",
        },
        success: {
            soft: "bg-emerald-500/10 text-emerald-300 border-emerald-500/40",
            outline: "bg-transparent text-emerald-300 border-emerald-500/60",
            solid: "bg-emerald-500/20 text-emerald-200 border-emerald-500/50",
        },
        danger: {
            soft: "bg-rose-500/10 text-rose-300 border-rose-500/40",
            outline: "bg-transparent text-rose-300 border-rose-500/60",
            solid: "bg-rose-500/20 text-rose-200 border-rose-500/50",
        },
        warning: {
            soft: "bg-amber-500/10 text-amber-300 border-amber-500/40",
            outline: "bg-transparent text-amber-300 border-amber-500/60",
            solid: "bg-amber-500/20 text-amber-200 border-amber-500/50",
        },

    } as const;

    return map[intent][tone];
}

function intentRingStyles(intent: BadgeIntent, tone: BadgeTone) {
    const map = {
        neutral: {
            soft: "bg-white/5 text-white/80 ring-white/10",
            outline: "bg-transparent text-white/80 ring-white/18",
            solid: "bg-white/15 text-white ring-white/12",
        },
        success: {
            soft: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/22",
            outline: "bg-transparent text-emerald-300 ring-emerald-500/30",
            solid: "bg-emerald-500/20 text-emerald-200 ring-emerald-500/22",
        },
        danger: {
            soft: "bg-rose-500/10 text-rose-300 ring-rose-500/22",
            outline: "bg-transparent text-rose-300 ring-rose-500/30",
            solid: "bg-rose-500/20 text-rose-200 ring-rose-500/22",
        },
        warning: {
            soft: "bg-amber-500/10 text-amber-300 ring-amber-500/22",
            outline: "bg-transparent text-amber-300 ring-amber-500/30",
            solid: "bg-amber-500/20 text-amber-200 ring-amber-500/22",
        },

    } as const;

    return map[intent][tone];
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            intent = "neutral",
            tone = "soft",
            size = "sm",
            shape = "rounded",
            hasBorder = true,
            icon,
            iconPosition = "leading",
            truncate = false,
            useRing = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const hasIcon = !!icon;

        return (
            <span
                ref={ref}
                className={cn(
                    base,
                    hasBorder && "border",
                    sizeStyles[size],
                    shapeStyles[shape],
                    useRing ? intentRingStyles(intent, tone) : intentStyles(intent, tone),
                    truncate && "max-w-[140px] truncate",
                    className
                )}
                {...props}
            >
                {hasIcon && iconPosition === "leading" && (
                    <span className="inline-flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                        {icon}
                    </span>
                )}

                <span className={cn("leading-none", truncate && "truncate")}>{children}</span>

                {hasIcon && iconPosition === "trailing" && (
                    <span className="inline-flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4">
                        {icon}
                    </span>
                )}
            </span>
        );
    }
);

Badge.displayName = "Badge";
