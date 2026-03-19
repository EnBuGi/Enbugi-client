"use client";

import React from "react";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import type { ScorePolicy } from "../model/project";
import { Text } from "../../../shared/components/ui/Text";
import { cn } from "../../../shared/utils/cn";

interface Props {
  scorePolicy: ScorePolicy;
}

export const ScoringList = ({ scorePolicy }: Props) => {
  const totalScore = scorePolicy.cases.reduce((sum, c) => sum + c.score, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Text variant="h4" className="font-bold">배점 구성</Text>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-amber-400" />
            <Text variant="small" className="text-sub">{scorePolicy.timeLimit}ms</Text>
          </div>
          <div className="flex items-center gap-2">
            <Database size={14} className="text-indigo-400" />
            <Text variant="small" className="text-sub">{scorePolicy.memoryLimit}MB</Text>
          </div>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <Text variant="small" className="font-bold text-primary">총 {totalScore}점</Text>
        </div>
      </div>

      <div className="space-y-3">
        {scorePolicy.cases.map((test) => (
          <div 
            key={test.id || test.name} 
            className={cn(
              "group relative overflow-hidden rounded-2xl border transition-all duration-300",
              test.isHidden 
                ? "bg-white/[0.02] border-white/5 hover:border-amber-500/20" 
                : "bg-white/[0.04] border-white/10 hover:border-primary/30 hover:bg-white/[0.06]"
            )}
          >
            {/* Background Decorative Accent */}
            <div className={cn(
              "absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 blur-2xl opacity-10 transition-opacity group-hover:opacity-20",
              test.isHidden ? "bg-amber-500" : "bg-primary"
            )} />

            <div className="relative p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-110",
                  test.isHidden 
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
                    : "bg-primary/10 border-primary/20 text-primary"
                )}>
                  {test.isHidden ? <Lock size={18} /> : <CheckCircle2 size={18} />}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Text className={cn(
                      "font-bold text-base tracking-tight",
                      test.isHidden ? "text-white/40 italic" : "text-white/90"
                    )}>
                      {test.name}
                    </Text>
                    {test.isHidden && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/20 font-bold uppercase tracking-tighter">
                        Hidden
                      </span>
                    )}
                  </div>
                  <Text variant="tiny" className="text-sub block opacity-60">
                    {test.isHidden 
                      ? "검증을 위한 비공개 테스트 케이스입니다." 
                      : "가독성과 구현 정확성을 검증하는 공개 케이스입니다."}
                  </Text>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <Text variant="tiny" className="text-sub uppercase font-bold tracking-widest opacity-40">배점</Text>
                <div className="flex items-baseline gap-0.5">
                  <Text className={cn(
                    "text-2xl font-black font-mono",
                    test.isHidden ? "text-amber-500/80" : "text-emerald-400"
                  )}>
                    +{test.score}
                  </Text>
                  <Text variant="tiny" className="text-sub font-bold">점</Text>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
