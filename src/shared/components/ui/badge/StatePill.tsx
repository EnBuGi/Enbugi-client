import * as React from "react";
import { Badge } from "./Badge";

export type StatePillVariant = "countdown" | "closed";

export type StatePillProps = {
    variant: StatePillVariant;
    label: string;
    icon?: React.ReactNode;
    className?: string;
};

export function StatePill({ variant, label, icon, className }: StatePillProps) {
    const isCountdown = variant === "countdown";

    return (
        <Badge
            intent={isCountdown ? "danger" : "neutral"}
            tone="soft"
            shape="pill"
            icon={icon}
            hasBorder={false}
            className={className}
        >
            {label}
        </Badge>
    );
}
