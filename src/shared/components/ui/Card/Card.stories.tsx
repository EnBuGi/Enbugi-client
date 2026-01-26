// src/shared/components/ui/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from './Card';
import { Text } from '../Text';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
    title: 'UI/Card',
    component: Card,
    parameters: { layout: 'centered' },
    decorators: [
        (Story) => (
            <div className="w-[520px] max-w-[92vw]">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        title: 'Notification',
        description: 'You have a new message from the system.',
        children: (
            <div className="space-y-2">
                <div className="h-2 w-full rounded bg-white/5" />
                <div className="h-2 w-[86%] rounded bg-white/5" />
                <div className="h-2 w-[64%] rounded bg-white/5" />
            </div>
        ),
        footer: (
            <div className="flex w-full items-center justify-between">
                <Text variant="tiny" className="text-zinc-500">
                    Updated 2m ago
                </Text>
                <Button size="sm">View</Button>
            </div>
        ),
        hover: true,
    },
};

export const ContentOnly: Story = {
    args: {
        children: (
            <div className="space-y-2">
                <Text variant="h4" className="text-white">
                    Simple Card
                </Text>
                <Text variant="small" className="text-zinc-400">
                    A minimal card using only children.
                </Text>
            </div>
        ),
    },
};

export const WithCover: Story = {
    args: {
        title: 'Cover Card',
        description: 'A card with a cover area at the top.',
        cover: (
            <div className="h-36 w-full bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
        ),
        children: (
            <Text variant="small" className="text-zinc-400">
                The cover accepts any ReactNode (image, video, banner, etc.).
            </Text>
        ),
        footer: (
            <Button size="sm" variant="secondary">
                Action
            </Button>
        ),
        hover: true,
    },
};

export const WithFooter: Story = {
    args: {
        title: 'Actions',
        description: 'Use the footer slot for buttons or links.',
        children: (
            <Text variant="small" className="text-zinc-400">
                When footer exists, it is separated by a subtle top border.
            </Text>
        ),
        footer: (
            <>
                <Button size="sm" variant="ghost">
                    Cancel
                </Button>
                <Button size="sm">Confirm</Button>
            </>
        ),
    },
};

export const HoverOff: Story = {
    args: {
        title: 'No Hover',
        description: 'Hover effect is disabled.',
        children: (
            <Text variant="small" className="text-zinc-400">
                Set hover=false to keep the card static.
            </Text>
        ),
        hover: false,
    },
};

export const WithBadge: Story = {
    args: {
        hover: true,
        children: (
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <Text variant="h4" className="text-white">
                        Project Deadline
                    </Text>
                    <span className="inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-400">
                        D-3
                    </span>
                </div>

                <Text variant="small" className="text-zinc-400">
                    Final submission is approaching. Please review remaining tasks and submit before the deadline.
                </Text>
            </div>
        ),
        footer: (
            <div className="flex w-full items-center justify-between">
                <Text variant="tiny" className="text-zinc-500">
                    Updated 10m ago
                </Text>
                <Button size="sm" variant="secondary">
                    Details
                </Button>
            </div>
        ),
    },
};

