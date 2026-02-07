import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import type { DropdownItem } from '@/shared/types/ui';
import { useState } from 'react';

const meta = {
    title: 'UI/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;


const cohortItems: DropdownItem[] = [
    { label: '23기', value: '23' },
    { label: '24기', value: '24' },
    { label: '25기', value: '25' },
    { label: '26기', value: '26' },
];


const roleItems: DropdownItem[] = [
    { label: '멘토', value: 'mentor' },
    { label: '멘티', value: 'mentee' },
];

const repositoryItems: DropdownItem[] = [
    {
        label: 'facebook/react',
        value: 'facebook/react',
        description: 'JavaScript library for building user interfaces',
    },
    {
        label: 'microsoft/TypeScript',
        value: 'microsoft/typescript',
        description: 'TypeScript is a typed superset of JavaScript',
    },
    {
        label: 'torvalds/linux',
        value: 'torvalds/linux',
        description: 'Linux kernel source tree',
    },
    {
        label: 'golang/go',
        value: 'golang/go',
        description: 'The Go programming language',
    },
    {
        label: 'kubernetes/kubernetes',
        value: 'kubernetes/kubernetes',
        description: 'Production-Grade Container Orchestration',
    },
    {
        label: 'docker/moby',
        value: 'docker/moby',
        description: 'Moby Project - a collaborative project for the container ecosystem',
    },
    {
        label: 'npm/npm',
        value: 'npm/npm',
        description: 'npm is the package manager for JavaScript',
    },
    {
        label: 'python/cpython',
        value: 'python/cpython',
        description: 'The Python programming language',
    },
];

/**
 * 기본 Select 컴포넌트 - 기수 선택용
 */
export const CohortSelection: Story = {
    render: () => {
        const [value, setValue] = useState<string>('');

        return (
            <div className="w-full max-w-md">
                <Select
                    label="기수 선택"
                    placeholder="기수를 선택해주세요"
                    items={cohortItems}
                    value={value}
                    onChange={setValue}
                    helperText="참여 중인 기수를 선택합니다"
                />
            </div>
        );
    },
};


export const RepositorySelection: Story = {
    render: () => {
        const [value, setValue] = useState<string>('');

        return (
            <div className="w-full max-w-md">
                <Select
                    label="Repository 선택"
                    placeholder="Repository를 선택해주세요"
                    items={repositoryItems}
                    value={value}
                    onChange={setValue}
                    helperText="GitHub에서 연동할 Repository를 선택합니다"
                />
            </div>
        );
    },
};

export const RoleSelection: Story = {
    render: () => {
        const [value, setValue] = useState<string>('');

        return (
            <div className="w-full max-w-md">
                <Select
                    label="역할 선택"
                    placeholder="역할을 선택해주세요"
                    items={roleItems}
                    value={value}
                    onChange={setValue}
                    helperText="멘토 또는 멘티를 선택합니다"
                />
            </div>
        );
    },
};

export const WithError: Story = {
    render: () => {
        const [value, setValue] = useState<string>('');
        const [submitted, setSubmitted] = useState(false);

        return (
            <div className="w-full max-w-md space-y-4">
                <Select
                    label="기수 선택"
                    placeholder="기수를 선택해주세요"
                    items={cohortItems}
                    value={value}
                    onChange={setValue}
                    error={submitted && !value}
                    helperText={
                        submitted && !value ? '기수를 선택해주세요' : '필수 항목입니다'
                    }
                />
                <button
                    onClick={() => setSubmitted(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover"
                >
                    제출
                </button>
            </div>
        );
    },
};

export const Disabled: Story = {
    render: () => {
        return (
            <div className="w-full max-w-md">
                <Select
                    label="기수 선택"
                    placeholder="기수를 선택해주세요"
                    items={cohortItems}
                    value="24"
                    onChange={() => { }}
                    disabled={true}
                    helperText="이 필드는 비활성화되어 있습니다"
                />
            </div>
        );
    },
};

export const WithLoadMore: Story = {
    render: () => {
        const [value, setValue] = useState<string>('');
        const [displayedItems, setDisplayedItems] = useState<DropdownItem[]>(
            repositoryItems.slice(0, 4)
        );
        const [isLoading, setIsLoading] = useState(false);
        const [hasMore, setHasMore] = useState(true);

        const handleLoadMore = () => {
            setIsLoading(true);
            // 시뮬레이션: 500ms 후 다음 항목들 로드
            setTimeout(() => {
                const currentCount = displayedItems.length;
                const newItems = repositoryItems.slice(
                    currentCount,
                    currentCount + 3
                );
                setDisplayedItems([...displayedItems, ...newItems]);
                setIsLoading(false);

                if (displayedItems.length + newItems.length >=
                    repositoryItems.length) {
                    setHasMore(false);
                }
            }, 500);
        };

        return (
            <div className="w-full max-w-md">
                <Select
                    label="Repository 선택"
                    placeholder="Repository를 선택해주세요"
                    items={displayedItems}
                    value={value}
                    onChange={setValue}
                    isLoading={isLoading}
                    hasMore={hasMore}
                    onLoadMore={handleLoadMore}
                    helperText="스크롤하면 더 많은 항목이 로드됩니다"
                />
            </div>
        );
    },
};


export const Empty: Story = {
    render: () => {
        return (
            <div className="w-full max-w-md">
                <Select
                    label="Repository 선택"
                    placeholder="Repository를 선택해주세요"
                    items={[]}
                    value=""
                    onChange={() => { }}
                    helperText="이용 가능한 항목이 없습니다"
                />
            </div>
        );
    },
};

export const LoadingState: Story = {
    render: () => {
        const [value, setValue] = useState<string>('');

        return (
            <div className="w-full max-w-md">
                <Select
                    label="Repository 선택"
                    placeholder="Repository를 선택해주세요"
                    items={repositoryItems.slice(0, 4)}
                    value={value}
                    onChange={setValue}
                    isLoading={true}
                    hasMore={true}
                    onLoadMore={() => { }}
                    helperText="로딩 상태에서 더 보기 버튼이 비활성화됩니다"
                />
            </div>
        );
    },
};

