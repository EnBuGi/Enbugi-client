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
                component:
                    'Block pagination (5 pages per block). Controlled component with optional page size selector.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        pageSize: { control: { type: 'number', min: 1 } },
        total: { control: { type: 'number', min: 0 } },
    },
} as Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [page, setPage] = useState(1);
        const [size, setSize] = useState(args.pageSize ?? 10);

        return (
            <div style={{ width: 640 }}>
                <Pagination
                    {...args}
                    total={args.total ?? 123}
                    currentPage={page}
                    pageSize={size}
                    onPageChange={setPage}
                    onPageSizeChange={setSize}
                />
            </div>
        );
    },
    args: {
        total: 123,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50],
    },
};


export const WithoutPageSizeSelector: Story = {
    render: (args) => {
        const [page, setPage] = useState(1);

        return (
            <div style={{ width: 640 }}>
                <Pagination {...args} total={300} currentPage={page} onPageChange={setPage} />
            </div>
        );
    },
    args: {
        pageSize: 10,
    },
};
