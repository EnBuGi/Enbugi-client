import React from "react";
import { AppShell } from "@/shared/components/layout/AppShell";
import { Gnb } from "@/shared/components/layout/Gnb";
import { BoxesIcon, MessageSquare, Users, CheckSquare2, Settings } from "lucide-react";

const MENTOR_SECTIONS = [
    {
        title: "Problems",
        items: [
            { label: "Problems", href: "/mentor/problems", icon: <BoxesIcon size={18} /> },
            { label: "Q&A", href: "/mentor/qna", icon: <MessageSquare size={18} /> },
            { label: "Submissions", href: "/mentor/submissions", icon: <CheckSquare2 size={18} /> },
        ],
    },
    {
        title: "Users",
        items: [
            { label: "Users", href: "/mentor/users", icon: <Users size={18} /> },
            { label: "Settings / Roles", href: "/mentor/settings", icon: <Settings size={18} /> },
        ],
    },
];

export default function MentorLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppShell sidebarNav={<Gnb variant="sidebar" sections={MENTOR_SECTIONS} items={[]} />}>
            {children}
        </AppShell>
    );
}
