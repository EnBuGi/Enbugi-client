"use client";

import React from "react";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import type { ScorePolicy } from "../model/project";
import { Text } from "../../../shared/components/ui/Text";
import { cn } from "../../../shared/utils/cn";

interface Props {
  scorePolicy: ScorePolicy;
}

export function ScoringList({ scorePolicy }: Props) {
  const { cases } = scorePolicy;

  if (!cases || cases.length === 0) {
    return null;
  }

  const totalScore = cases.reduce((acc, c) => acc + c.score, 0);

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <Text variant="h3" className="text-lg font-bold text-white">배점 리스트</Text>
        <Text className="text-sm text-white/50">총점: <span className="text-white font-bold">{totalScore}</span>점</Text>
      </div>

      <div className="grid gap-3">
        {cases.map((testCase, index) => (
          <div 
            key={testCase.id || index}
            className={cn(
              "flex items-center justify-between p-4 rounded-lg border transition-all",
              testCase.isHidden 
                ? "bg-white/5 border-white/5 opacity-80" 
                : "bg-white/5 border-white/10 hover:border-white/20"
            )}
          >
            <div className="flex items-center gap-3">
              {testCase.isHidden ? (
                <Lock className="w-4 h-4 text-white/30" />
              ) : (
                <Circle className="w-4 h-4 text-white/50" />
              )}
              <Text 
                className={cn(
                  "font-medium",
                  testCase.isHidden ? "text-white/40 italic" : "text-white/80"
                )}
              >
                {testCase.name}
              </Text>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/30 uppercase tracking-tighter">Score</span>
              <Text className="font-mono font-bold text-white">{testCase.score}</Text>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 pt-2 text-[10px] text-white/30 uppercase tracking-widest font-mono">
        <div>Time Limit: {scorePolicy.timeLimit}ms</div>
        <div>Memory Limit: {scorePolicy.memoryLimit}MB</div>
      </div>
    </div>
  );
}
