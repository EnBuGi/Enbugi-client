import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { InputBox } from './InputBox';

const meta: Meta<typeof InputBox> = {
    title: 'UI/InputBox',
    component: InputBox,
    parameters: { layout: 'centered' },
    decorators: [
        (Story) => (
            <div className="w-[420px] max-w-[90vw]">
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof InputBox>;

export const Default: Story = {
    args: {
        label: 'Email',
        placeholder: 'you@example.com',
        helperText: 'We’ll never share your email.',
        icon: <Mail size={18} />,
    },
};

export const ErrorState: Story = {
    args: {
        label: 'Email',
        placeholder: 'you@example.com',
        icon: <Mail size={18} />,
        error: 'Invalid email format.',
    },
};

export const Password: Story = {
    render: (args) => {
        const [show, setShow] = React.useState(false);
        const [hasError, setHasError] = React.useState(false);

        return (
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={hasError}
                            onChange={(e) => setHasError(e.target.checked)}
                        />
                        Error state
                    </label>
                </div>

                <InputBox
                    {...args}
                    type={show ? 'text' : 'password'}
                    icon={<Lock size={18} />}
                    rightIcon={show ? <EyeOff size={18} /> : <Eye size={18} />}
                    onRightIconClick={() => setShow((v) => !v)}
                    error={hasError ? 'Password must be at least 8 characters.' : undefined}
                    helperText={!hasError ? 'Use at least 8 characters.' : undefined}
                    hideErrorIcon
                />
            </div>
        );
    },
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Username',
        placeholder: 'disabled input',
        helperText: 'This field is disabled.',
        disabled: true,
    },
};
