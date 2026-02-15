import * as React from "react";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";

export type ListRowTone = "default" | "success" | "danger" | "muted";

export type ListRowProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title" | "onClick"
> & {
    leading?: React.ReactNode;

    title: React.ReactNode;
    description?: React.ReactNode;
    meta?: React.ReactNode;
    trailing?: React.ReactNode;

    /** 네비게이션 목적이면 href 사용 (href > onClick보다 ) */
    href?: string;

    /** 액션 목적이면 onClick 사용 */
    onClick?: () => void;

    /** 선택/활성 상태: 왼쪽 indicator line */
    isActive?: boolean;

    /** 비활성 상태: 클릭/포커스 막고 흐리게 */
    isDisabled?: boolean;

    /** 상태 톤(선택): 성공/실패 등 강조 */
    tone?: ListRowTone;
};

const toneClass: Record<ListRowTone, string> = {
    default: "",
    success: "border-emerald-500/15 ring-emerald-500/10",
    danger: "border-[#B93234]/25 ring-[#B93234]/15",
    muted: "border-white/5 ring-white/5 bg-white/[0.02]"

};

export function ListRow({
    className,
    leading,
    title,
    description,
    meta,
    trailing,
    href,
    onClick,
    isActive = false,
    isDisabled = false,
    tone = "default",
    ...props
}: ListRowProps) {
    const clickable = (!!href || !!onClick) && !isDisabled;

    const baseClass = cn(
        "relative w-full overflow-hidden rounded-lg border bg-surface shadow-sm ring-1",
        "border-white/5 ring-white/5",
        clickable &&
        "transition-all hover:-translate-y-0.5 hover:border-white/10 hover:ring-white/10",
        isDisabled && "opacity-60 pointer-events-none",
        tone !== "default" && toneClass[tone],
        isActive &&
        "before:absolute before:inset-y-3 before:left-0 before:w-[2px] before:bg-[#B93234] before:shadow-[0_0_20px_-5px_rgba(185,50,52,0.5)]",
        className
    );

    const content = (
        <div className="flex w-full items-center gap-3 px-4 py-4">
            {leading && <div className="shrink-0">{leading}</div>}

            <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-2">
                    <div className="min-w-0 truncate text-base font-semibold text-white">
                        {title}
                    </div>
                    {meta && <div className="shrink-0 text-xs text-white/50">{meta}</div>}
                </div>

                {description && (
                    <div className="mt-1 line-clamp-2 text-sm text-white/70">
                        {description}
                    </div>
                )}
            </div>

            {trailing && <div className="shrink-0">{trailing}</div>}
        </div>
    );


    if (href && !isDisabled) {
        const { onDrag, onDragEnd, onDragStart, ...rest } = props as any;
        return (
            <Link href={href} className={baseClass} {...rest}>
                {content}
            </Link>
        );
    }

    if (onClick && !isDisabled) {
        const { role, tabIndex, ...rest } = props as any;
        return (
            <button
                type="button"
                onClick={onClick}
                className={cn(baseClass, "text-left")}
                {...rest}
            >
                {content}
            </button>
        );
    }

    return (
        <div className={baseClass} {...props}>
            {content}
        </div>
    );
}
