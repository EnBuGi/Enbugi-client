
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppShell } from "./AppShell";
import { Gnb } from "./Gnb";
import { Grid3X3, MessageSquare, BoxesIcon, Users, CheckSquare2, Settings } from "lucide-react";

const meta: Meta<typeof AppShell> = {
    title: "Layout/AppShell",
    component: AppShell,
    parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof AppShell>;

const menteeNav = [
    { label: "Problems", href: "/problems", icon: <Grid3X3 size={18} /> },
    { label: "Q&A", href: "/qna", icon: <MessageSquare size={18} /> },
];

const mentorSections = [
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

export const Mentee: Story = {
    args: {
        headerNav: <Gnb variant="header" items={menteeNav} activeHref="/problems" />,
    },
};

export const Mentor: Story = {
    args: {
        sidebarNav: <Gnb variant="sidebar" sections={mentorSections} items={[]} activeHref="/mentor/problems" />,
    },
};
