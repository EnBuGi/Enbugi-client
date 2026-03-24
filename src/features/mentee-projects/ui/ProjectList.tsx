"use client";

import * as React from "react";
import { ChevronRight, Clock } from "lucide-react";
import { List } from "@/shared/components/ui/list/List";
import { ListRow } from "@/shared/components/ui/list/ListRow";
import { useProjects } from "@/features/mentee-projects/hooks/useProjects";

import { TagBadge } from "@/shared/components/ui/badge/TagBadge";
import { StatePill } from "@/shared/components/ui/badge/StatePill";
import type { ProjectStatus } from "@/features/mentee-projects/model/project";

const Score = ({ value }: { value?: number }) => {
    if (value == null) {
        return <span className="text-sm font-semibold text-white/40">-</span>;
    }

    const isPerfect = value === 100;
    const colorClass = isPerfect ? "text-emerald-400" : "text-white";

    return (
        <span className={`text-sm font-semibold ${colorClass}`}>
            {value} <span className="text-white/40">/ 100</span>
        </span>
    );
};

const calculateDDay = (dueDate: string): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const end = new Date(dueDate);
    end.setHours(0, 0, 0, 0);

    const timeDiff = end.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff > 0) return `D-${daysDiff}`;
    if (daysDiff === 0) return "D-Day";
    return `D+${Math.abs(daysDiff)}`;
};

type ProjectSection = "ONGOING" | "DONE";
const toSection = (status?: ProjectStatus): ProjectSection | null => {
    if (status === "ONGOING") return "ONGOING";
    if (status === "DONE") return "DONE";

    // BEFORE or undefined는 목록에서 제외
    return null;
};

export function ProjectList() {
    const { data: projects, isLoading } = useProjects();

    const list = projects ?? [];

    const visible = list.filter((p) => toSection(p.status) !== null);
    const ongoingProjects = visible.filter((p) => toSection(p.status) === "ONGOING");
    const doneProjects = visible.filter((p) => toSection(p.status) === "DONE");

    const ProjectListSection = ({
        title,
        items,
    }: {
        title: string;
        items: typeof list;
    }) => (
        <div className="mb-8">
            <div className="text-2xl font-bold text-white mb-4">{title}</div>

            <List spacing="md">
                {items.length > 0 ? (
                    items.map((p) => {
                        const section = toSection(p.status);

                        return (
                            <ListRow
                                key={p.id}
                                leading={<TagBadge label={p.type} />}
                                title={p.title}
                                description={
                                    <span className="inline-flex items-center gap-2 text-white/60">
                                        {p.startDate} - {p.dueDate}
                                    </span>
                                }
                                trailing={
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-[11px] text-white/50">최고 점수</div>
                                            <Score value={p.score} />
                                        </div>

                                        {section === "ONGOING" ? (
                                            <StatePill
                                                variant="countdown"
                                                label={calculateDDay(p.dueDate)}
                                                icon={<Clock className="h-3.5 w-3.5" />}
                                            />
                                        ) : (
                                            <StatePill variant="closed" label="closed" />
                                        )}

                                        <ChevronRight className="h-5 w-5 text-white/35" />
                                    </div>
                                }
                                href={`/mentee/projects/${p.id}`}
                                isActive={section === "ONGOING"}
                            />
                        );
                    })
                ) : (
                    <div className="w-full py-12 text-center">
                        <span className="text-sm text-white/60">항목이 없습니다.</span>
                    </div>
                )}
            </List>
        </div>
    );

    return (
        <div style={{ maxWidth: "1200px" }}>
            {isLoading ? (
                <div className="p-6 text-sm text-white/60">로딩 중...</div>
            ) : (
                <div className="flex flex-col gap-10">
                    <ProjectListSection title="진행중인 스터디" items={ongoingProjects} />
                    <ProjectListSection title="지난 스터디" items={doneProjects} />
                </div>
            )}
        </div>
    );
}

export default ProjectList;
