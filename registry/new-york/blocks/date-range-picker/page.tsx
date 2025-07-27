"use client";

import { useState } from "react";
import {
  DateRangePicker,
  PredefinedRange,
} from "@/registry/new-york/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import {
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  subMonths,
} from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DateRangePickerDemo() {
  const [basicRange, setBasicRange] = useState<DateRange | undefined>();
  const [customRange, setCustomRange] = useState<DateRange | undefined>();
  const [limitedRange, setLimitedRange] = useState<DateRange | undefined>();
  const [compactRange, setCompactRange] = useState<DateRange | undefined>();
  const [rangesOnlyRange, setRangesOnlyRange] = useState<
    DateRange | undefined
  >();

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
    <div className="w-full min-h-screen">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="p-3 space-y-4">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-bold">Date Range Picker</h1>
            <p className="text-sm text-muted-foreground px-2">
              A comprehensive date range picker component with predefined ranges
              and calendar selection.
            </p>
          </div>

          {/* Tabs for Mobile */}
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-8">
              <TabsTrigger value="examples" className="text-xs">
                Examples
              </TabsTrigger>
              <TabsTrigger value="docs" className="text-xs">
                Docs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="examples" className="mt-4 space-y-4">
              {/* Basic Example - Simplified */}
              <div className="space-y-3 p-3 border rounded-lg bg-background">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Basic Usage</h3>
                  <p className="text-xs text-muted-foreground">
                    Standard date range picker with default ranges.
                  </p>
                </div>
                <div className="space-y-2">
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
                </div>
              </div>

              {/* Custom Ranges Example */}
              <div className="space-y-3 p-3 border rounded-lg bg-background">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Custom Ranges</h3>
                  <p className="text-xs text-muted-foreground">
                    Business-specific predefined ranges.
                  </p>
                </div>
                <div className="space-y-2">
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
                </div>
              </div>

              {/* Date Constraints Example */}
              <div className="space-y-3 p-3 border rounded-lg bg-background">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Date Constraints</h3>
                  <p className="text-xs text-muted-foreground">
                    Limited to the last 6 months.
                  </p>
                </div>
                <div className="space-y-2">
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
                </div>
              </div>

              {/* Calendar Only */}
              <div className="space-y-3 p-3 border rounded-lg bg-background">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Calendar Only</h3>
                  <p className="text-xs text-muted-foreground">
                    Calendar view without predefined ranges.
                  </p>
                </div>
                <div className="space-y-2">
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
                </div>
              </div>

              {/* Quick Select Only */}
              <div className="space-y-3 p-3 border rounded-lg bg-background">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Quick Select Only</h3>
                  <p className="text-xs text-muted-foreground">
                    Predefined ranges only - quick filtering.
                  </p>
                </div>
                <div className="space-y-2">
                  <DateRangePicker
                    value={rangesOnlyRange}
                    onChange={setRangesOnlyRange}
                    showCalendar={false}
                    placeholder="Quick filter..."
                    buttonWidth="w-full"
                    applyOnPredefinedSelect={true}
                    data-testid="ranges-only-picker"
                  />
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                    {formatDateRange(rangesOnlyRange)}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="docs" className="mt-4 space-y-4">
              {/* Mobile Documentation */}
              <div className="space-y-4">
                <div className="p-3 border rounded-lg bg-background">
                  <h3 className="font-medium text-sm mb-2">Configuration</h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="font-medium mb-1">Display Options</div>
                      <div className="space-y-1 text-muted-foreground">
                        <div>
                          <code className="bg-muted px-1 rounded">
                            showPredefinedRanges
                          </code>{" "}
                          - Toggle ranges
                        </div>
                        <div>
                          <code className="bg-muted px-1 rounded">
                            showCalendar
                          </code>{" "}
                          - Toggle calendar
                        </div>
                        <div>
                          <code className="bg-muted px-1 rounded">
                            numberOfMonths
                          </code>{" "}
                          - 1 or 2 months
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="font-medium mb-1">Behavior</div>
                      <div className="space-y-1 text-muted-foreground">
                        <div>
                          <code className="bg-muted px-1 rounded">
                            applyOnPredefinedSelect
                          </code>{" "}
                          - Auto-apply
                        </div>
                        <div>
                          <code className="bg-muted px-1 rounded">
                            closeOnClear
                          </code>{" "}
                          - Close on clear
                        </div>
                        <div>
                          <code className="bg-muted px-1 rounded">
                            minDate/maxDate
                          </code>{" "}
                          - Constraints
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="font-medium mb-1">Accessibility</div>
                      <div className="space-y-1 text-muted-foreground">
                        <div>• ARIA labels and descriptions</div>
                        <div>• Keyboard navigation support</div>
                        <div>• Screen reader compatibility</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg bg-background">
                  <h3 className="font-medium text-sm mb-2">Usage Example</h3>
                  <div className="bg-muted p-2 rounded text-xs font-mono overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{`import { DateRangePicker } from "@/components/ui/date-range-picker";

function MyComponent() {
  const [dateRange, setDateRange] = useState();

  return (
    <DateRangePicker
      value={dateRange}
      onChange={setDateRange}
      placeholder="Select range"
      buttonWidth="w-full"
    />
  );
}`}</pre>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Desktop Layout (unchanged, but with container) */}
      <div className="hidden lg:block">
        <div className="space-y-8 p-6 max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight">
              Date Range Picker
            </h1>
            <p className="text-base text-muted-foreground max-w-3xl">
              A comprehensive date range picker component with predefined ranges
              and calendar selection. Fully responsive and accessible for all
              devices.
            </p>
          </div>

          {/* Examples Grid for Desktop */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Basic Example */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Usage</CardTitle>
                <CardDescription>
                  Standard date range picker with default predefined ranges and
                  calendar selection.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DateRangePicker
                  value={basicRange}
                  onChange={setBasicRange}
                  placeholder="Select your date range..."
                  data-testid="basic-date-picker"
                />
                {basicRange && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {formatDateRange(basicRange)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Custom Ranges Example */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Predefined Ranges</CardTitle>
                <CardDescription>
                  Date picker with business-specific predefined ranges.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DateRangePicker
                  value={customRange}
                  onChange={setCustomRange}
                  predefinedRanges={customPredefinedRanges}
                  placeholder="Select reporting period..."
                  applyOnPredefinedSelect={true}
                  data-testid="custom-ranges-picker"
                />
                {customRange && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {formatDateRange(customRange)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Date Constraints Example */}
            <Card>
              <CardHeader>
                <CardTitle>With Date Constraints</CardTitle>
                <CardDescription>
                  Date picker limited to the last 6 months with a single month
                  calendar view.
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
                  buttonWidth="w-[280px]"
                  data-testid="constrained-picker"
                />
                {limitedRange && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {formatDateRange(limitedRange)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Compact Layout Example */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar Only</CardTitle>
                <CardDescription>
                  Calendar-only view without predefined ranges for
                  space-constrained layouts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DateRangePicker
                  value={compactRange}
                  onChange={setCompactRange}
                  showPredefinedRanges={false}
                  numberOfMonths={1}
                  placeholder="Pick dates..."
                  buttonWidth="w-[240px]"
                  closeOnClear={true}
                  data-testid="compact-picker"
                />
                {compactRange && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {formatDateRange(compactRange)}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Select Only Example - Full Width */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Select Only</CardTitle>
              <CardDescription>
                Predefined ranges only without calendar - perfect for quick
                filtering.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <DateRangePicker
                value={rangesOnlyRange}
                onChange={setRangesOnlyRange}
                showCalendar={false}
                placeholder="Quick filter..."
                buttonWidth="w-[200px]"
                applyOnPredefinedSelect={true}
                data-testid="ranges-only-picker"
              />
              {rangesOnlyRange && (
                <p className="text-sm text-muted-foreground">
                  Selected: {formatDateRange(rangesOnlyRange)}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Configuration Options */}
          <Card>
            <CardHeader>
              <CardTitle>Configuration Options</CardTitle>
              <CardDescription>
                Available props and configuration options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-sm">
                <div className="space-y-3">
                  <h3 className="font-medium">Display Options</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>
                      • <code>showPredefinedRanges</code> - Toggle predefined
                      ranges
                    </li>
                    <li>
                      • <code>showCalendar</code> - Toggle calendar view
                    </li>
                    <li>
                      • <code>numberOfMonths</code> - 1 or 2 month display
                    </li>
                    <li>
                      • <code>buttonWidth</code> - Custom trigger button width
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium">Behavior Options</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>
                      • <code>applyOnPredefinedSelect</code> - Auto-apply
                      predefined ranges
                    </li>
                    <li>
                      • <code>closeOnClear</code> - Close popover when clearing
                    </li>
                    <li>
                      • <code>clearOnSelect</code> - Immediate clear action
                    </li>
                    <li>
                      • <code>minDate</code> / <code>maxDate</code> - Date
                      constraints
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium">Accessibility</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• ARIA labels and descriptions</li>
                    <li>• Keyboard navigation support</li>
                    <li>• Screen reader compatibility</li>
                    <li>• Focus management</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium">Performance</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• React.memo for sub-components</li>
                    <li>• useCallback for event handlers</li>
                    <li>• useMemo for expensive calculations</li>
                    <li>• Optimized re-renders</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Example</CardTitle>
              <CardDescription>
                Basic implementation with TypeScript
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto">
                <pre>{`import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

function MyComponent() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <DateRangePicker
      value={dateRange}
      onChange={setDateRange}
      placeholder="Select date range"
      showPredefinedRanges={true}
      applyOnPredefinedSelect={true}
      numberOfMonths={2}
      buttonWidth="w-full sm:w-[300px]" // Responsive width
    />
  );
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
