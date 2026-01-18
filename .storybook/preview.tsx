import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';
import React from 'react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#09090b',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-background rounded-md text-main font-sans antialiased p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;
