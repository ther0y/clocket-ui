# Clocket UI Registry

A custom shadcn/ui component registry for distributing high-quality, reusable React components built with TypeScript, Tailwind CSS v4, and Radix UI primitives.

## 🚀 Quick Start

Install components directly using the shadcn CLI:

```bash
npx shadcn@latest add https://ui.clocket.io/r/date-range-picker.json
```

Or add the registry to your project:

```bash
npx shadcn@latest add --registry https://ui.clocket.io
```

## 📦 Available Components

### Date Range Picker

A comprehensive, accessible date range picker component with:

- **Predefined ranges** (Today, Yesterday, Last 7 days, etc.)
- **Custom range selection** with calendar interface
- **Business-friendly ranges** (This Week, Last 90 Days, This Year)
- **Date constraints** (min/max date support)
- **Flexible layout options** (single/dual month view)
- **Full accessibility** support with ARIA labels
- **TypeScript** support with proper type definitions

**Features:**

- 🎯 **Highly configurable** - 15+ props for customization
- ♿ **Fully accessible** - ARIA compliant with keyboard navigation
- 🎨 **Consistent styling** - Built with Tailwind CSS and Radix UI
- 📱 **Responsive design** - Works on all screen sizes
- ⚡ **Performance optimized** - Memoized components and callbacks
- 🔧 **Developer friendly** - TypeScript support and clear API

## 🛠 Installation

### Prerequisites

- React 18+
- Next.js 13+ (for App Router support)
- Tailwind CSS v4
- TypeScript (recommended)

### Using shadcn CLI

```bash
# Install the date range picker
npx shadcn@latest add https://ui.clocket.io/r/date-range-picker.json

# Or install from registry
npx shadcn@latest add date-range-picker --registry https://ui.clocket.io
```

### Manual Installation

1. Install dependencies:

```bash
npm install date-fns react-day-picker lucide-react
```

2. Add required shadcn/ui components:

```bash
npx shadcn@latest add button calendar popover scroll-area select
```

3. Copy the component files from this registry.

## 💻 Usage Examples

### Basic Usage

```tsx
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { useState } from "react";

function MyComponent() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <DateRangePicker
      value={dateRange}
      onChange={setDateRange}
      placeholder="Select date range..."
      buttonWidth="w-full sm:w-[300px]"
    />
  );
}
```

### Advanced Usage with Custom Ranges

```tsx
import {
  DateRangePicker,
  PredefinedRange,
} from "@/components/ui/date-range-picker";
import { subDays, startOfWeek, endOfWeek } from "date-fns";

const customRanges: PredefinedRange[] = [
  {
    label: "This Week",
    value: {
      from: startOfWeek(new Date(), { weekStartsOn: 1 }),
      to: endOfWeek(new Date(), { weekStartsOn: 1 }),
    },
    description: "Current week (Monday to Sunday)",
  },
  {
    label: "Last 30 Days",
    value: { from: subDays(new Date(), 29), to: new Date() },
    description: "Previous 30 days",
  },
];

function AdvancedExample() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <DateRangePicker
      value={dateRange}
      onChange={setDateRange}
      predefinedRanges={customRanges}
      applyOnPredefinedSelect={true}
      numberOfMonths={2}
      minDate={subDays(new Date(), 90)}
      maxDate={new Date()}
      placeholder="Select reporting period..."
    />
  );
}
```

## 🎮 Live Demo

Visit [https://ui.clocket.io](https://ui.clocket.io) to see all components in action with:

- Interactive examples
- Configuration options
- Code snippets
- Usage instructions

## 🏗 Development

### Setup

```bash
# Clone the repository
git clone https://github.com/clocket/clocket-ui-registry.git
cd clocket-ui-registry

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build registry
pnpm registry:build
```

### Project Structure

```
├── app/                    # Next.js app directory
├── components/ui/          # shadcn/ui components
├── registry/              # Registry component definitions
│   └── new-york/
│       ├── ui/            # UI components
│       └── blocks/        # Demo/example blocks
├── public/r/              # Built registry files (JSON)
├── registry.json          # Registry configuration
└── package.json
```

### Adding New Components

1. Create component in `registry/new-york/ui/`
2. Add demo/example in `registry/new-york/blocks/`
3. Update `registry.json` with component definition
4. Run `pnpm registry:build` to generate JSON files
5. Update the demo page in `app/page.tsx`

## 📄 Registry Schema

The registry follows the [shadcn/ui registry schema](https://ui.shadcn.com/docs/registry):

```json
{
  "name": "component-name",
  "type": "registry:ui",
  "title": "Component Title",
  "description": "Component description",
  "dependencies": ["date-fns", "lucide-react"],
  "registryDependencies": ["button", "popover"],
  "files": [
    {
      "path": "registry/new-york/ui/component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Registry**: [https://ui.clocket.io](https://ui.clocket.io)
- **Documentation**: [shadcn/ui Registry Docs](https://ui.shadcn.com/docs/registry)
- **Issues**: [GitHub Issues](https://github.com/clocket/clocket-ui-registry/issues)

---

Built with ❤️ using [shadcn/ui](https://ui.shadcn.com), [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Radix UI](https://radix-ui.com).
