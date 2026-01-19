import { Text } from "@/shared/components/ui/Text";
import { Button } from "@/shared/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-main p-8 md:p-24 selection:bg-primary selection:text-white">
      {/* 1. Hero Section */}
      <section className="flex flex-col items-start gap-6 mb-32 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surfaceHighlight border border-white/10">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <Text variant="label" className="tracking-widest">En# Design System v1.0</Text>
        </div>

        <div className="space-y-2">
          <Text variant="display-2xl" gradient>
            Crafting the Future <br /> of Digital Experience.
          </Text>
        </div>

        <Text variant="large" className="max-w-xl opacity-80">
          A high-end design system tailored for modern tech products.
          Built with precision, deep aesthetics, and maximum performance.
        </Text>

        <div className="flex gap-4 mt-4">
          {/* Replaced native buttons with Button component */}
          <Button variant="primary" size="lg">Get Started</Button>
          <Button variant="secondary" size="lg">Documentation</Button>
        </div>
      </section>

      {/* 2. Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {/* Card 1: Typography */}
        <div className="p-8 rounded-3xl bg-surface border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Text variant="h3" className="mb-4">Typography</Text>
          <div className="space-y-4">
            <Text variant="h1">Heading XL</Text>
            <Text variant="h2">Heading LG</Text>
            <Text variant="h3">Heading MD</Text>
            <Text variant="body">Body text with optimized readability.</Text>
            <Text variant="label">Label Text</Text>
          </div>
        </div>

        {/* Card 2: Colors */}
        <div className="p-8 rounded-3xl bg-surface border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Text variant="h3" className="mb-4">Color Palette</Text>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="w-full h-12 rounded bg-primary shadow-glow-sm" />
              <Text variant="tiny" as="p">Primary</Text>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 rounded bg-surfaceHighlight border border-white/10" />
              <Text variant="tiny" as="p">Surface</Text>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 rounded bg-success/20 border border-success/50" />
              <Text variant="tiny" as="p">Success</Text>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 rounded bg-error/20 border border-error/50" />
              <Text variant="tiny" as="p">Error</Text>
            </div>
          </div>
        </div>

        {/* Card 3: Glassmorphism */}
        <div className="p-8 rounded-3xl bg-glass border border-glassBorder backdrop-blur-md relative">
          <Text variant="h3" className="mb-4">Glassmorphism</Text>
          <Text variant="body" className="mb-6 opacity-80">
            Advanced backdrop filters and border transparency for depth.
          </Text>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
            <Text variant="code" className="block text-center">Standard Glass</Text>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <Text variant="code" className="block text-center">Dark Glass</Text>
          </div>
        </div>
      </div>

      {/* 3. Buttons Showcase (New) */}
      <section className="flex flex-col items-start gap-8 mb-32 w-full">
        <Text variant="h2">Buttons</Text>

        <div className="w-full p-8 rounded-3xl bg-surface border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Text variant="h4" className="text-muted">Variants</Text>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="space-y-4">
              <Text variant="h4" className="text-muted">Sizes</Text>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className="space-y-4">
              <Text variant="h4" className="text-muted">States</Text>
              <div className="flex flex-wrap items-center gap-4">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
