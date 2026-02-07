import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Clock, ChevronRight } from "lucide-react";

import { Badge } from "./Badge";
import { StatusBadge } from "./StatusBadge";
import { TagBadge } from "./TagBadge";
import { StatePill } from "./StatePill";

import { List } from "@/shared/components/ui/list/List";
import { ListRow } from "@/shared/components/ui/list/ListRow";



const meta: Meta<typeof Badge> = {
    title: "UI/Badge",
    component: Badge,
    parameters: {
        layout: "centered",
        backgrounds: { disable: true },
    },
    argTypes: {
        intent: {
            control: "select",
            options: ["neutral", "success", "danger", "warning"],
        },
        tone: { control: "select", options: ["soft", "outline", "solid"] },
        size: { control: "select", options: ["sm", "md"] },
        shape: { control: "select", options: ["rounded", "pill"] },
        hasBorder: { control: "boolean" },
        iconPosition: { control: "select", options: ["leading", "trailing"] },
        truncate: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgeMatrix: Story = {
    render: () => {
        const intents = ["neutral", "success", "danger", "warning"] as const;
        const tones = ["soft", "outline", "solid"] as const;

        return (
            <div className="flex flex-col gap-5">
                {tones.map((tone) => (
                    <div key={tone} className="flex flex-col gap-2">
                        <div className="text-xs font-semibold uppercase text-gray-500">
                            {tone}
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {intents.map((intent) => (
                                <Badge
                                    key={`${tone}-${intent}`}
                                    intent={intent}
                                    tone={tone}
                                    hasBorder={true}
                                >
                                    {intent.toUpperCase()}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="mt-2 flex flex-col gap-2">
                    <div className="text-xs font-semibold uppercase text-gray-500">
                        hasBorder compare
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Badge intent="neutral" tone="outline" hasBorder={true}>
                            WITH BORDER
                        </Badge>
                        <Badge intent="neutral" tone="outline" hasBorder={false}>
                            WITHOUT BORDER
                        </Badge>
                    </div>
                </div>
            </div>
        );
    },
};

export const StatusBadges: Story = {
    render: () => (
        <div className="flex gap-3">
            <StatusBadge status="success" />
            <StatusBadge status="fail" />
            <StatusBadge status="success">AC</StatusBadge>
            <StatusBadge status="fail">WA</StatusBadge>
        </div>
    ),
};

export const TagBadges: Story = {
    render: () => (
        <div className="flex gap-3">
            <TagBadge label="SPRING" />
            <TagBadge label="REACT" />
            <TagBadge label="JAVA" />
        </div>
    ),
};

export const StatePills: Story = {
    render: () => (
        <div className="flex gap-3">
            <StatePill variant="countdown" label="D-2" icon={<Clock />} />
            <StatePill variant="closed" label="Closed" />
            <StatePill variant="closed" label="Closed" icon={<ChevronRight />} />
        </div>
    ),
};

const Score = ({ value }: { value?: number }) => {
    if (value == null) return <span className="text-sm font-semibold text-white/40">-</span>;
    const isPerfect = value === 100;
    const colorClass = isPerfect ? "text-white" : "text-[#B93234]";
    return (
        <span className={`text-sm font-semibold ${colorClass}`}>
            {value} <span className="text-white/40">/ 100</span>
        </span>
    );
};



export const CurriculumRows: StoryObj<any> = {
    args: { spacing: "md" },
    render: (args) => (
        <div className="w-[900px]">
            <List {...args}>
                {/* 1. SignUp Server (Top) */}
                <ListRow
                    leading={<TagBadge label="SPRING" />}
                    title="SignUp Server"
                    description={
                        <span className="inline-flex items-center gap-2 text-white/60">
                            2024-03-01 ~ 2024-03-15
                        </span>
                    }
                    trailing={
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[11px] text-white/50">최고 점수</div>
                                <Score value={100} />
                            </div>

                            <StatePill variant="countdown" label="D-2" icon={<Clock className="h-4 w-4" />} />
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                    isActive
                />

                {/* 2. SignUp Client */}
                <ListRow
                    leading={<TagBadge label="REACT" />}
                    title="SignUp Client"
                    description={
                        <span className="inline-flex items-center gap-2 text-white/60">
                            2024-03-01 ~ 2024-03-15
                        </span>
                    }
                    trailing={
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[11px] text-white/50">최고 점수</div>
                                <Score />
                            </div>

                            <StatePill variant="countdown" label="D-2" icon={<Clock className="h-4 w-4" />} />
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />

                {/* 3. CMD */}
                <ListRow
                    leading={<TagBadge label="JAVA" />}
                    title="CMD"
                    description={
                        <span className="inline-flex items-center gap-2 text-white/60">
                            2024-03-01 ~ 2024-03-15
                        </span>
                    }
                    trailing={
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[11px] text-white/50">최고 점수</div>
                                <Score value={90} />
                            </div>

                            <StatePill variant="closed" label="Closed" />
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />

                {/* 4. Library */}
                <ListRow
                    leading={<TagBadge label="JAVA" />}
                    title="Library"
                    description={
                        <span className="inline-flex items-center gap-2 text-white/60">
                            2024-03-01 ~ 2024-03-15
                        </span>
                    }
                    trailing={
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[11px] text-white/50">최고 점수</div>
                                <Score value={100} />
                            </div>

                            <StatePill variant="closed" label="Closed" />
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />

                {/* 5. Tic-Tac-Toe */}
                <ListRow
                    leading={<TagBadge label="JAVA" />}
                    title="Tic-Tac-Toe"
                    description={
                        <span className="inline-flex items-center gap-2 text-white/60">
                            2024-03-01 ~ 2024-03-15
                        </span>
                    }
                    trailing={
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[11px] text-white/50">최고 점수</div>
                                <Score value={85} />
                            </div>

                            <StatePill variant="closed" label="Closed" />
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />

                {/* 6. Star Pattern (Bottom) */}
                <ListRow
                    leading={<TagBadge label="JAVA" />}
                    title="Star Pattern"
                    description={
                        <span className="inline-flex items-center gap-2 text-white/60">
                            2024-03-01 ~ 2024-03-15
                        </span>
                    }
                    trailing={
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[11px] text-white/50">최고 점수</div>
                                <Score value={78} />
                            </div>

                            <StatePill variant="closed" label="Closed" />
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />
            </List>
        </div>
    ),
};

export const SubmissionHistoryRows: StoryObj<any> = {
    args: { spacing: "lg" },
    render: (args) => (
        <div className="w-[600px]">
            <div className="w-full rounded-2xl border border-white/10 bg-background p-8">
                <div className="mb-5 flex items-center gap-3">
                    <div className="text-xl font-bold text-white">제출 이력</div>
                </div>

                <List {...args}>
                    <ListRow
                        leading={
                            <div className="flex items-center gap-3">
                                <StatusBadge status="success">성공</StatusBadge>
                            </div>
                        }
                        title={<span className="sr-only">submission row</span>}
                        description={
                            <div className="inline-flex items-center gap-4 text-white/55">
                                <span>2024-03-10 14:30</span>
                            </div>
                        }
                        trailing={
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <Score value={100} />
                                </div>
                                <ChevronRight className="h-5 w-5 text-white/25" aria-hidden="true" />
                            </div>
                        }
                        href="/"
                        tone="success"
                    />

                    <ListRow
                        leading={
                            <div className="flex items-center gap-3">
                                <StatusBadge status="fail">실패</StatusBadge>
                            </div>
                        }
                        title={<span className="sr-only">submission row</span>}
                        description={
                            <div className="inline-flex items-center gap-4 text-white/55">
                                <span>2024-03-10 14:30</span>
                            </div>
                        }
                        trailing={
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <Score value={64} />
                                </div>
                                <ChevronRight className="h-5 w-5 text-white/25" aria-hidden="true" />
                            </div>
                        }
                        href="/"
                        tone="danger"
                    />

                    <ListRow
                        leading={
                            <div className="flex items-center gap-3">
                                <StatusBadge status="fail">실패</StatusBadge>
                            </div>
                        }
                        title={<span className="sr-only">submission row</span>}
                        description={
                            <div className="inline-flex items-center gap-4 text-white/55">
                                <span>2024-03-10 11:30</span>
                            </div>
                        }
                        trailing={
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-[11px] text-white/50">점수</div>
                                    <Score value={71} />
                                </div>
                                <ChevronRight className="h-5 w-5 text-white/25" aria-hidden="true" />
                            </div>
                        }
                        href="/"
                        tone="danger"
                    />

                    <ListRow
                        leading={
                            <div className="flex items-center gap-3">
                                <StatusBadge status="success">성공</StatusBadge>
                            </div>
                        }
                        title={<span className="sr-only">submission row</span>}
                        description={
                            <div className="inline-flex items-center gap-4 text-white/55">
                                <span>2024-03-10 09:00</span>
                            </div>
                        }
                        trailing={
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-[11px] text-white/50">점수</div>
                                    <Score value={75} />
                                </div>
                                <ChevronRight className="h-5 w-5 text-white/25" aria-hidden="true" />
                            </div>
                        }
                        href="/"
                        tone="success"
                    />
                </List>
            </div>
        </div>
    ),
};