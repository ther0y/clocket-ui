"use client";

import * as React from "react";
import { useState } from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DateRangePicker,
  PredefinedRange,
} from "@/registry/new-york/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import {
  subDays,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  subMonths,
} from "date-fns";

export default function Home() {
  const [basicRange, setBasicRange] = useState<DateRange | undefined>();
  const [customRange, setCustomRange] = useState<DateRange | undefined>();
  const [limitedRange, setLimitedRange] = useState<DateRange | undefined>();
  const [compactRange, setCompactRange] = useState<DateRange | undefined>();

  // Custom predefined ranges for business scenarios
  const customPredefinedRanges: PredefinedRange[] = [
    {
      label: "This Week",
      value: {
        from: startOfWeek(new Date(), { weekStartsOn: 1 }),
        to: endOfWeek(new Date(), { weekStartsOn: 1 }),
      },
      description: "Select the current week (Monday to Sunday)",
    },
    {
      label: "Last Week",
      value: {
        from: startOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
        to: endOfWeek(subDays(new Date(), 7), { weekStartsOn: 1 }),
      },
      description: "Select the previous week",
    },
    {
      label: "Last 90 Days",
      value: { from: subDays(new Date(), 89), to: new Date() },
      description: "Select the last 90 days",
    },
    {
      label: "This Year",
      value: { from: startOfYear(new Date()), to: endOfYear(new Date()) },
      description: "Select the current year",
    },
  ];

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return "No date selected";
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-svh px-4 py-6 gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Clocket UI Registry
          </h1>
          <OpenInV0Button name="date-range-picker" className="w-fit" />
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          A custom registry for distributing Clocket UI components using shadcn.
        </p>
      </header>

      <main className="flex-1">
        <Tabs defaultValue="examples" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Basic Example */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Basic Usage</CardTitle>
                  <CardDescription className="text-sm">
                    Standard date range picker with default predefined ranges.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DateRangePicker
                    value={basicRange}
                    onChange={setBasicRange}
                    placeholder="Select your date range..."
                    buttonWidth="w-full"
                    data-testid="basic-date-picker"
                  />
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                    {formatDateRange(basicRange)}
                  </div>
                </CardContent>
              </Card>

              {/* Custom Ranges Example */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Custom Ranges</CardTitle>
                  <CardDescription className="text-sm">
                    Business-specific predefined ranges for reporting.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DateRangePicker
                    value={customRange}
                    onChange={setCustomRange}
                    predefinedRanges={customPredefinedRanges}
                    placeholder="Select reporting period..."
                    buttonWidth="w-full"
                    applyOnPredefinedSelect={true}
                    data-testid="custom-ranges-picker"
                  />
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                    {formatDateRange(customRange)}
                  </div>
                </CardContent>
              </Card>

              {/* Date Constraints Example */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Date Constraints</CardTitle>
                  <CardDescription className="text-sm">
                    Limited to the last 6 months with single month view.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DateRangePicker
                    value={limitedRange}
                    onChange={setLimitedRange}
                    minDate={subMonths(new Date(), 6)}
                    maxDate={new Date()}
                    numberOfMonths={1}
                    placeholder="Select within last 6 months..."
                    buttonWidth="w-full"
                    data-testid="constrained-picker"
                  />
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                    {formatDateRange(limitedRange)}
                  </div>
                </CardContent>
              </Card>

              {/* Calendar Only Example */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Calendar Only</CardTitle>
                  <CardDescription className="text-sm">
                    Calendar view without predefined ranges.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DateRangePicker
                    value={compactRange}
                    onChange={setCompactRange}
                    showPredefinedRanges={false}
                    numberOfMonths={1}
                    placeholder="Pick dates..."
                    buttonWidth="w-full"
                    closeOnClear={true}
                    data-testid="compact-picker"
                  />
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                    {formatDateRange(compactRange)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Options</CardTitle>
                <CardDescription>
                  Available props and configuration options for the date range
                  picker
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Display Options</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>
                          •{" "}
                          <code className="bg-muted px-1 rounded">
                            showPredefinedRanges
                          </code>{" "}
                          - Toggle predefined ranges
                        </li>
                        <li>
                          •{" "}
                          <code className="bg-muted px-1 rounded">
                            showCalendar
                          </code>{" "}
                          - Toggle calendar view
                        </li>
                        <li>
                          •{" "}
                          <code className="bg-muted px-1 rounded">
                            numberOfMonths
                          </code>{" "}
                          - 1 or 2 month display
                        </li>
                        <li>
                          •{" "}
                          <code className="bg-muted px-1 rounded">
                            buttonWidth
                          </code>{" "}
                          - Custom trigger button width
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Behavior Options</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>
                          •{" "}
                          <code className="bg-muted px-1 rounded">
                            applyOnPredefinedSelect
                          </code>{" "}
                          - Auto-apply predefined ranges
                        </li>
                        <li>
                          •{" "}
                          <code className="bg-muted px-1 rounded">
                            closeOnClear
                          </code>{" "}
                          - Close popover when clearing
                        </li>
                        <li>
                          •{" "}
                          <code className="bg-muted px-1 rounded">
                            clearOnSelect
                          </code>{" "}
                          - Immediate clear action
                        </li>
                        <li>
                          •{" "}
                          <code className="bg-muted px-1 rounded">
                            minDate/maxDate
                          </code>{" "}
                          - Date constraints
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Accessibility</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• ARIA labels and descriptions</li>
                        <li>• Keyboard navigation support</li>
                        <li>• Screen reader compatibility</li>
                        <li>• Focus management</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Performance</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• React.memo for sub-components</li>
                        <li>• useCallback for event handlers</li>
                        <li>• useMemo for expensive calculations</li>
                        <li>• Optimized re-renders</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Installation & Usage</CardTitle>
                <CardDescription>
                  How to install and use the date range picker component
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Installation</h3>
                  <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                    npx shadcn@latest add date-range-picker
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Basic Usage</h3>
                  <div className="bg-muted p-3 rounded-lg text-sm font-mono overflow-x-auto">
                    <pre>{`import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { useState } from "react";

function MyComponent() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <DateRangePicker
      value={dateRange}
      onChange={setDateRange}
      placeholder="Select date range"
      buttonWidth="w-full sm:w-[300px]"
    />
  );
}`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Advanced Usage</h3>
                  <div className="bg-muted p-3 rounded-lg text-sm font-mono overflow-x-auto">
                    <pre>{`// With custom predefined ranges
const customRanges = [
  {
    label: "Last 7 days",
    value: { from: subDays(new Date(), 6), to: new Date() }
  },
  {
    label: "Last 30 days", 
    value: { from: subDays(new Date(), 29), to: new Date() }
  }
];

<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  predefinedRanges={customRanges}
  applyOnPredefinedSelect={true}
  numberOfMonths={2}
  minDate={subMonths(new Date(), 6)}
  maxDate={new Date()}
/>`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
