import * as React from "react";
import { Badge } from "./Badge";

type Status = "success" | "fail";

export type StatusBadgeProps = {
    status: Status;
    children?: React.ReactNode;
    className?: string;
};

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
    const isSuccess = status === "success";

    return (
        <Badge
            intent={isSuccess ? "success" : "danger"}
            tone="soft"
            shape="rounded"
            hasBorder={true}
            className={className}
        >
            {children ?? (isSuccess ? "성공" : "실패")}
        </Badge>
    );
}
