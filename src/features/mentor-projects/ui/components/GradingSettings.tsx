'use client';

import React, { useRef } from 'react';
import { Upload, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Text } from '@/shared/components/ui/Text';
import { Button } from '@/shared/components/ui/Button';
import { InputBox } from '@/shared/components/ui/InputBox/InputBox';
import { mentorProjectApi, TestCaseDto } from '../../api/projects';

interface GradingSettingsProps {
  timeLimit: number;
  memoryLimit: number;
  testCases: TestCaseDto[];
  onCasesChange: (cases: TestCaseDto[]) => void;
  onLimitChange: (field: 'timeLimit' | 'memoryLimit', value: number) => void;
  onTestCodeKeyChange: (key: string) => void;
}

export function GradingSettings({
  timeLimit,
  memoryLimit,
  testCases,
  onCasesChange,
  onLimitChange,
  onTestCodeKeyChange,
}: GradingSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isParsing, setIsParsing] = React.useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    try {
      const response = await mentorProjectApi.parseTestCode(file);
      const newCases: TestCaseDto[] = response.methodNames.map((name) => ({
        name,
        score: 0,
        isHidden: false,
      }));
      onCasesChange(newCases);
      onTestCodeKeyChange(response.testCodeKey);
    } catch (error) {
      console.error('Failed to parse test code:', error);
      alert('테스트 코드 파싱에 실패했습니다. 올바른 .zip 파일인지 확인해주세요.');
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const updateTestCase = (index: number, field: keyof TestCaseDto, value: any) => {
    const nextCases = [...testCases];
    nextCases[index] = { ...nextCases[index], [field]: value };
    onCasesChange(nextCases);
  };

  const removeTestCase = (index: number) => {
    onCasesChange(testCases.filter((_, i) => i !== index));
  };

  const distributeScores = () => {
    if (testCases.length === 0) return;
    const baseScore = Math.floor(100 / testCases.length);
    const remainder = 100 % testCases.length;
    
    const newCases = testCases.map((tc, idx) => ({
      ...tc,
      score: idx < remainder ? baseScore + 1 : baseScore
    }));
    onCasesChange(newCases);
  };

  const totalScore = testCases.reduce((sum, c) => sum + (Number(c.score) || 0), 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Text variant="label" className="text-xl font-bold text-white">
          채점 설정
        </Text>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-zinc-500 hover:text-white"
            onClick={distributeScores}
          >
            균등 배분
          </Button>
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1 border border-white/10">
            <Text variant="small" className="text-zinc-400">총점</Text>
            <Text variant="large" className={`font-bold ${totalScore === 100 ? 'text-green-400' : 'text-amber-400'}`}>
              {totalScore} / 100
            </Text>
          </div>
        </div>
      </div>

      {/* Execution Limits */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputBox
          label="시간 제한 (ms)"
          type="number"
          placeholder="2000"
          value={timeLimit}
          onChange={(e) => onLimitChange('timeLimit', Number(e.target.value))}
        />
        <InputBox
          label="메모리 제한 (MB)"
          type="number"
          placeholder="256"
          value={memoryLimit}
          onChange={(e) => onLimitChange('memoryLimit', Number(e.target.value))}
        />
      </div>

      {/* Test Code Upload */}
      <div className="flex flex-col gap-3">
        <Text variant="small" className="font-medium text-zinc-300">
          채점용 테스트 파일 (.zip)
        </Text>
        
        <input
          type="file"
          accept=".zip"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {testCases.length === 0 ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`group flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all p-10 
              ${isParsing ? 'border-amber-500/50 bg-amber-500/5 cursor-wait' : 'border-white/10 bg-surfaceHighlight/20 hover:border-zinc-500 hover:bg-white/5'}`}
          >
            {isParsing ? (
              <div className="flex flex-col items-center gap-3">
                <RotateCcw className="animate-spin text-amber-500" size={32} />
                <Text className="text-amber-500 font-medium">테스트 메소드 추출 중...</Text>
              </div>
            ) : (
              <>
                <Upload
                  className="mb-4 text-zinc-500 transition-colors group-hover:text-white"
                  size={32}
                />
                <Text className="text-center font-medium text-zinc-400 group-hover:text-white">
                  .zip 파일을 드롭하거나 클릭하여 업로드하세요
                </Text>
                <Text variant="small" className="mt-2 text-zinc-500">
                  @Test 어노테이션이 붙은 메소드를 자동으로 인식합니다
                </Text>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Test Case List */}
            <div className="max-h-[400px] overflow-y-auto pr-2 flex flex-col gap-2">
              {testCases.map((tc, idx) => (
                <div key={idx} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 group transition-colors hover:bg-white/10">
                  <div className="flex flex-1 flex-col truncate">
                    <Text className="font-mono text-sm text-white truncate" title={tc.name}>
                      {tc.name}
                    </Text>
                    <div className="flex items-center gap-4 mt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tc.isHidden}
                          onChange={(e) => updateTestCase(idx, 'isHidden', e.target.checked)}
                          className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-red-600 focus:ring-red-600 focus:ring-offset-zinc-900"
                        />
                        <Text variant="small" className="text-zinc-500 select-none">비공개 테스트</Text>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-24">
                      <InputBox
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="0"
                        value={tc.score === 0 ? '' : tc.score}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          updateTestCase(idx, 'score', val === '' ? 0 : parseInt(val, 10));
                        }}
                        className="text-right h-10 w-24"
                      />
                    </div>
                    <button
                      onClick={() => removeTestCase(idx)}
                      className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-2">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs border-white/10"
                onClick={() => fileInputRef.current?.click()}
              >
                다른 파일로 대체하기
              </Button>
            </div>
          </div>
        )}
      </div>

      {totalScore !== 100 && testCases.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 p-3 border border-amber-500/20">
          <AlertCircle size={16} className="text-amber-500" />
          <Text variant="small" className="text-amber-500 font-medium">
            테스트 케이스 점수 합계가 100점이 되어야 합니다.
          </Text>
        </div>
      )}
    </div>
  );
}

// Helper icon for spin
const RotateCcw = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);