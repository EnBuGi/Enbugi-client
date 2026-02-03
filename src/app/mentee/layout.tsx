import React from "react";
import { AppShell } from "@/shared/components/layout/AppShell";
import { Gnb } from "@/shared/components/layout/Gnb";
import { Grid3X3, MessageSquare } from "lucide-react";

const MENTEE_NAV = [
    { label: "Problems", href: "/problems", icon: <Grid3X3 size={18} /> },
    { label: "Q&A", href: "/qna", icon: <MessageSquare size={18} /> },
];

export default function MenteeLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppShell headerNav={<Gnb variant="header" items={MENTEE_NAV} />}>
            {children}
        </AppShell>
    );
}
