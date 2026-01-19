
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { InputBox } from './InputBox';

const meta: Meta<typeof InputBox> = {
    title: 'UI/InputBox',
    component: InputBox,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="w-[420px] max-w-[90vw]">
                <Story />
            </div>
        ),
    ],
    argTypes: {
        error: { control: 'text' },
        helperText: { control: 'text' },
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof InputBox>;

/** 1) 기본 (아이콘 + 도움말) */
export const Default: Story = {
    args: {
        label: 'Email',
        placeholder: 'you@example.com',
        helperText: 'We’ll never share your email.',
        icon: <Mail size={18} />,
    },
};

/** 2) 에러 상태 (error + 에러 아이콘 표시) */
export const ErrorState: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        icon: <Lock size={18} />,
        error: 'Password must be at least 8 characters.',
    },
};

/** 3) Disabled 상태 */
export const Disabled: Story = {
    args: {
        label: 'Username',
        placeholder: 'disabled input',
        helperText: 'This field is disabled.',
        disabled: true,
    },
};
