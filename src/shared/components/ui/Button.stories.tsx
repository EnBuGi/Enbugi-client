import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Loader2, Mail, ArrowRight } from 'lucide-react';

const meta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Primary UI component for user interaction. Supports various variants, sizes, and states.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'ghost', 'destructive', 'link'],
            description: 'The visual style of the button',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'icon'],
            description: 'The size of the button',
        },
        isLoading: {
            control: 'boolean',
            description: 'Shows a loading spinner and disables the button',
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the button interaction',
        },
        asChild: {
            table: {
                disable: true,
            },
        },
        leftIcon: {
            control: false,
            description: 'Icon to display on the left side',
        },
        rightIcon: {
            control: false,
            description: 'Icon to display on the right side',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variants
export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary Button',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary Button',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Ghost Button',
    },
};

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: 'Destructive Button',
    },
};

export const Link: Story = {
    args: {
        variant: 'link',
        children: 'Link Button',
    },
};

// Sizes
export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small Button',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Large Button',
    },
};

export const IconWithoutText: Story = {
    args: {
        size: 'icon',
        children: <Loader2 />,
    },
};

// Icons
export const WithLeftIcon: Story = {
    args: {
        children: 'Email Login',
        leftIcon: <Mail />,
    },
};

export const WithRightIcon: Story = {
    args: {
        children: 'Get Started',
        rightIcon: <ArrowRight />,
    },
};

export const WithBothIcons: Story = {
    args: {
        children: 'Dashboard',
        leftIcon: <Mail />,
        rightIcon: <ArrowRight />,
    },
};

// States
export const Loading: Story = {
    args: {
        isLoading: true,
        children: 'Loading...',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled Button',
    },
};
