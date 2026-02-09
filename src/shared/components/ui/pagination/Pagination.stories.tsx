import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
    title: 'UI/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Block pagination. Controlled component with configurable pagesPerBlock.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        pageSize: { control: { type: 'number', min: 1 } },
        pagesPerBlock: { control: { type: 'number', min: 1, max: 12 } },
        total: { control: { type: 'number', min: 0 } },
    },
} as Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [page, setPage] = useState(1);

        return (
            <div style={{ width: 640 }}>
                <Pagination {...args} total={args.total ?? 123} currentPage={page} onPageChange={setPage} />
            </div>
        );
    },
    args: {
        total: 123,
        pageSize: 10,
        pagesPerBlock: 5,
    },
};

export const ManyPages_BlockJump: Story = {
    render: (args) => {
        const [page, setPage] = useState(1);

        return (
            <div style={{ width: 640 }}>
                <Pagination {...args} total={999} currentPage={page} onPageChange={setPage} />
            </div>
        );
    },
    args: {
        pageSize: 10,
        pagesPerBlock: 5,
    },
};
