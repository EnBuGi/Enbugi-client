import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ChevronRight, Clock } from "lucide-react";


import { List } from "./List";
import { ListRow } from "./ListRow";

const meta: Meta<typeof List> = {
    title: "shared/list/List",
    component: List,
    parameters: {
        layout: "centered",
        backgrounds: { default: "dark" },
    },
    argTypes: {
        divider: { control: "boolean" },
        spacing: { control: "radio", options: ["sm", "md", "lg"] },
        isEmpty: { control: "boolean" },
    },
};
export default meta;

type Story = StoryObj<typeof List>;

const LanguageBadge = ({ children }: { children: React.ReactNode }) => (
    <span
        className={[
            "inline-flex items-center justify-center",
            "h-7 px-3 rounded-lg",
            "border border-white/10 bg-white/5",
            "text-[12px] font-semibold tracking-wide text-white/90",
            "font-mono leading-none",
            "select-none shrink-0",
        ].join(" ")}
    >
        {children}
    </span>
);

type StatusVariant = "active" | "closed";

const StatusPill = ({
    children,
    variant = "active",
}: {
    children: React.ReactNode;
    variant?: StatusVariant;
}) => {
    const variantClass =
        variant === "closed"
            ? "border-white/10 bg-white/5 text-white/40"
            : "border-[#B93234]/30 bg-[#B93234]/10 text-[#B93234]";

    return (
        <span
            className={[
                "inline-flex items-center gap-1",
                "h-7 px-3 rounded-full",
                "text-[12px] font-semibold leading-none shrink-0",
                variantClass,
            ].join(" ")}
        >
            {variant === "active" && <Clock className="h-3.5 w-3.5" />}
            {children}
        </span>
    );
};

const Score = ({ value }: { value?: number }) => {
    if (value == null) {
        return (
            <span className="text-sm font-semibold text-white/40">
                -
            </span>
        );
    }

    const isPerfect = value === 100;
    const colorClass = isPerfect ? "text-white" : "text-[#B93234]";

    return (
        <span className={`text-sm font-semibold ${colorClass}`}>
            {value} <span className="text-white/40">/ 100</span>
        </span>
    );
};

export const ListRowPropMatrix: Story = {
    args: { spacing: "md" },
    render: (args) => (
        <div className="w-[900px]">
            <div className="w-full rounded-2xl border border-white/10 bg-background p-8">
                <div className="mb-5">
                    <div className="text-xl font-bold text-white">ListRow Props Matrix</div>
                    <div className="mt-1 text-sm text-white/60">
                        leading / title / meta / description / trailing
                    </div>
                </div>

                <List {...args}>
                    {/* 1) leading */}
                    <ListRow
                        leading={<LanguageBadge>JAVA</LanguageBadge>}
                        title="leading only"
                        description={<span className="text-white/60">leading이 왼쪽 고정 영역에 들어감</span>}
                        href="/"
                    />

                    {/* 2) title */}
                    <ListRow
                        title={
                            <span className="inline-flex items-center gap-2">
                                title only <span className="text-xs text-white/40">(truncate test)</span>
                            </span>
                        }
                        href="/"
                    />

                    {/* 3) meta */}
                    <ListRow
                        title="meta only"
                        meta={<span className="font-mono">UPDATED 2m ago</span>}
                        description={<span className="text-white/60">meta는 title 오른쪽에 고정(shrink-0)</span>}
                        href="/"
                    />

                    {/* 4) description */}
                    <ListRow
                        title="description only"
                        description={
                            <span className="text-white/60">
                                description은 2줄 clamp. 길어지면 여기서부터 말줄임 처리됨. 아주 길게 써서 line-clamp가
                                동작하는지 테스트해보자.
                            </span>
                        }
                        href="/"
                    />

                    {/* 5) trailing */}
                    <ListRow
                        title="trailing only"
                        description={<span className="text-white/60">오른쪽 끝에 고정(shrink-0)</span>}
                        trailing={
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-[11px] text-white/50">점수</div>
                                    <Score value={85} />
                                </div>
                                <ChevronRight className="h-5 w-5 text-white/35" aria-hidden="true" />
                            </div>
                        }
                        href="/"
                    />
                </List>
            </div>
        </div>
    ),
};


export const ListRowToneMatrix: Story = {
    args: { spacing: "md" },
    render: (args) => (
        <div className="w-[900px]">
            <div className="w-full rounded-2xl border border-white/10 bg-background p-8">
                <div className="mb-5">
                    <div className="text-xl font-bold text-white">ListRow Tone Matrix</div>
                    <div className="mt-1 text-sm text-white/60">
                        default / success / danger / muted
                    </div>
                </div>

                <List {...args}>
                    <ListRow
                        leading={<LanguageBadge>DEFAULT</LanguageBadge>}
                        title="tone: default"
                        description={<span className="text-white/60">기본 border/ring</span>}
                        trailing={<ChevronRight className="h-5 w-5 text-white/35" aria-hidden="true" />}
                        href="/"
                        tone="default"
                    />

                    <ListRow
                        leading={
                            <span className="inline-flex items-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[12px] font-semibold text-emerald-300">
                                SUCCESS
                            </span>
                        }
                        title="tone: success"
                        description={<span className="text-white/60">emerald border/ring 강조</span>}
                        trailing={
                            <div className="flex items-center gap-4">
                                <Score value={100} />
                                <ChevronRight className="h-5 w-5 text-white/25" aria-hidden="true" />
                            </div>
                        }
                        href="/"
                        tone="success"
                    />

                    <ListRow
                        leading={
                            <span className="inline-flex items-center rounded-lg border border-[#B93234]/20 bg-[#B93234]/10 px-3 py-1 text-[12px] font-semibold text-[#B93234]">
                                DANGER
                            </span>
                        }
                        title="tone: danger"
                        description={<span className="text-white/60">brand red border/ring 강조</span>}
                        trailing={
                            <div className="flex items-center gap-4">
                                <Score value={64} />
                                <ChevronRight className="h-5 w-5 text-white/25" aria-hidden="true" />
                            </div>
                        }
                        href="/"
                        tone="danger"
                    />

                    <ListRow
                        leading={<LanguageBadge>MUTED</LanguageBadge>}
                        title="tone: muted"
                        description={<span className="text-white/60">톤이 거의 기본에 가깝게 눌림(약한 강조)</span>}
                        trailing={<ChevronRight className="h-5 w-5 text-white/35" aria-hidden="true" />}
                        href="/"
                        tone="muted"
                    />
                </List>
            </div>
        </div>
    ),
};

export const DividerVsSpacing: Story = {
    args: { spacing: "md" },
    render: (args) => (
        <div className="w-[980px]">
            <div className="grid grid-cols-2 gap-6">
                {/* Divider */}
                <div className="rounded-2xl border border-white/10 bg-background p-6">
                    <div className="mb-4">
                        <div className="text-lg font-bold text-white">divider = true</div>
                        <div className="text-sm text-white/60">붙어있는 리스트(구분선)</div>
                    </div>

                    <List {...args} divider>
                        <ListRow title="문제 조회" description="필터/정렬" trailing="23개" href="/" />
                        <ListRow title="제출 이력" description="최근 제출 내역" trailing="8개" href="/" />
                        <ListRow title="채점 결과" description="테스트 케이스별" trailing="12개" href="/" />
                    </List>
                </div>

                {/* Spacing */}
                <div className="rounded-2xl border border-white/10 bg-background p-6">
                    <div className="mb-4">
                        <div className="text-lg font-bold text-white">divider = false</div>
                        <div className="text-sm text-white/60">카드 묶음(간격)</div>
                    </div>

                    <List {...args} spacing="md">
                        <ListRow title="문제 조회" description="필터/정렬" trailing="23개" href="/" />
                        <ListRow title="제출 이력" description="최근 제출 내역" trailing="8개" href="/" />
                        <ListRow title="채점 결과" description="테스트 케이스별" trailing="12개" href="/" />
                    </List>
                </div>
            </div>
        </div>
    ),
};


export const ActiveStates: Story = {
    args: { spacing: "md" },
    render: (args) => (
        <div className="w-[900px]">
            <div className="rounded-2xl border border-white/10 bg-background p-8">
                <div className="mb-5">
                    <div className="text-xl font-bold text-white">isActive Matrix</div>
                    <div className="mt-1 text-sm text-white/60">
                        기본 / active / active + tone 조합
                    </div>
                </div>

                <List {...args}>
                    <ListRow
                        title="기본 row"
                        description="isActive 없음"
                        trailing={<ChevronRight className="h-5 w-5 text-white/35" />}
                        href="/"
                    />

                    <ListRow
                        title="활성 row"
                        description="현재 선택된 항목"
                        trailing={<ChevronRight className="h-5 w-5 text-white/35" />}
                        href="/"
                        isActive
                    />

                    <ListRow
                        title="활성 + danger"
                        description="실패 결과인데 현재 보고 있는 항목"
                        trailing={
                            <div className="flex items-center gap-3">
                                <Score value={64} />
                                <ChevronRight className="h-5 w-5 text-white/25" />
                            </div>
                        }
                        href="/"
                        tone="danger"
                        isActive
                    />
                </List>
            </div>
        </div>
    ),
};

export const DisabledStates: Story = {
    args: { spacing: "md" },
    render: (args) => (
        <div className="w-[900px]">
            <div className="rounded-2xl border border-white/10 bg-background p-8">
                <div className="mb-5">
                    <div className="text-xl font-bold text-white">isDisabled Matrix</div>
                    <div className="mt-1 text-sm text-white/60">
                        href / onClick / static 에서 disabled 동작
                    </div>
                </div>

                <List {...args}>
                    <ListRow
                        title="href row (disabled)"
                        description="href가 있어도 pointer-events-none"
                        trailing={<ChevronRight className="h-5 w-5 text-white/35" />}
                        href="/"
                        isDisabled
                    />

                    <ListRow
                        title="button row (disabled)"
                        description="onClick도 막힘"
                        trailing={<ChevronRight className="h-5 w-5 text-white/35" />}
                        onClick={() => console.log("clicked")}
                        isDisabled
                    />

                    <ListRow
                        title="static row (disabled)"
                        description="원래 static인데도 흐려진 상태"
                        trailing={<ChevronRight className="h-5 w-5 text-white/35" />}
                        isDisabled
                    />
                </List>
            </div>
        </div>
    ),
};



export const CurriculumRows: Story = {
    args: { spacing: "md" },
    render: (args) => (
        <div className="w-[900px]">
            <List {...args}>

                {/* 1. SignUp Server (Top) */}
                <ListRow
                    leading={<LanguageBadge>SPRING</LanguageBadge>}
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
                            <StatusPill>D-2</StatusPill>
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                    isActive
                />

                {/* 2. SignUp Client */}
                <ListRow
                    leading={<LanguageBadge>REACT</LanguageBadge>}
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
                            <StatusPill>D-2</StatusPill>
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />

                {/* 3. CMD */}
                <ListRow
                    leading={<LanguageBadge>JAVA</LanguageBadge>}
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
                            <StatusPill variant="closed">Closed</StatusPill>
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />

                {/* 4. Library */}
                <ListRow
                    leading={<LanguageBadge>JAVA</LanguageBadge>}
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
                            <StatusPill variant="closed">Closed</StatusPill>
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />

                {/* 5. Tic-Tac-Toe */}
                <ListRow
                    leading={<LanguageBadge>JAVA</LanguageBadge>}
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
                            <StatusPill variant="closed">Closed</StatusPill>
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />

                {/* 6. Star Pattern (Bottom) */}
                <ListRow
                    leading={<LanguageBadge>JAVA</LanguageBadge>}
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
                            <StatusPill variant="closed">Closed</StatusPill>
                            <ChevronRight className="h-5 w-5 text-white/35" />
                        </div>
                    }
                    href="/"
                />

            </List>
        </div>
    ),
};
export const SubmissionHistoryRows: Story = {
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


                                <span className="inline-flex items-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[12px] font-semibold text-emerald-300">
                                    성공
                                </span>
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


                                <span className="inline-flex items-center rounded-lg border border-[#B93234]/20 bg-[#B93234]/10 px-3 py-1 text-[12px] font-semibold text-[#B93234]">
                                    실패
                                </span>
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

                                <span className="inline-flex items-center rounded-lg border border-[#B93234]/20 bg-[#B93234]/10 px-3 py-1 text-[12px] font-semibold text-[#B93234]">
                                    실패
                                </span>
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


                                <span className="inline-flex items-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[12px] font-semibold text-emerald-300">
                                    성공
                                </span>
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


