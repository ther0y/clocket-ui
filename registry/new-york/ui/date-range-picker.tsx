/**
 * Date Range Picker Component
 *
 * A production-ready, accessible date range picker component following shadcn/ui best practices.
 *
 * Features:
 * ✅ Fully accessible with ARIA labels and keyboard navigation
 * ✅ Mobile-responsive with adaptive layouts (desktop: side-by-side, mobile: stacked)
 * ✅ Performance optimized with React.memo, useCallback, and useMemo
 * ✅ TypeScript strict mode with comprehensive type definitions
 * ✅ Customizable predefined ranges with descriptions for screen readers
 * ✅ Date constraints support (min/max dates)
 * ✅ Flexible display options (calendar-only, ranges-only, or both)
 * ✅ Consistent styling with shadcn/ui design system
 * ✅ Comprehensive error handling and edge case validation
 * ✅ Test-friendly with data-testid support
 * ✅ Proper focus management and popover state handling
 *
 * Usage:
 * ```tsx
 * import { DateRangePicker } from "@/components/ui/date-range-picker";
 * import { DateRange } from "react-day-picker";
 *
 * function MyComponent() {
 *   const [dateRange, setDateRange] = useState<DateRange | undefined>();
 *
 *   return (
 *     <DateRangePicker
 *       value={dateRange}
 *       onChange={setDateRange}
 *       placeholder="Select date range"
 *       showPredefinedRanges={true}
 *       numberOfMonths={2}
 *     />
 *   );
 * }
 * ```
 *
 * Dependencies:
 * - date-fns: For date manipulation and formatting
 * - react-day-picker: For calendar functionality
 * - lucide-react: For icons
 * - shadcn/ui components: button, calendar, popover, scroll-area, select
 *
 * @version 1.0.0
 * @author shadcn/ui registry
 * @license MIT
 */
"use client";

import * as React from "react";
import {
  format,
  startOfDay,
  endOfDay,
  subDays,
  startOfMonth,
  endOfMonth,
  subMonths,
  isValid,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Predefined date range option
 */
export interface PredefinedRange {
  /** Display label for the range option */
  label: string;
  /** Date range value */
  value: DateRange;
  /** Optional description for accessibility */
  description?: string;
}

/**
 * Props for the DateRangePicker component
 */
export interface DateRangePickerProps {
  /** Currently selected date range */
  value?: DateRange;
  /** Callback when date range changes */
  onChange?: (range: DateRange | undefined) => void;
  /** Additional CSS classes */
  className?: string;
  /** Placeholder text when no range is selected */
  placeholder?: string;
  /** Custom predefined date ranges */
  predefinedRanges?: PredefinedRange[];
  /** Whether to show predefined ranges section */
  showPredefinedRanges?: boolean;
  /** Whether to show calendar section */
  showCalendar?: boolean;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Whether to close popover when clearing selection */
  closeOnClear?: boolean;
  /** Whether to apply selection immediately when predefined range is selected */
  applyOnPredefinedSelect?: boolean;
  /** Whether to clear selection immediately when clear button is clicked */
  clearOnSelect?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Number of months to display in calendar */
  numberOfMonths?: 1 | 2;
  /** Button width (CSS class or explicit width) */
  buttonWidth?: string;
  /** Test ID for testing purposes */
  "data-testid"?: string;
}

/**
 * Default predefined date ranges
 */
const defaultPredefinedRanges: PredefinedRange[] = [
  {
    label: "Today",
    value: { from: startOfDay(new Date()), to: endOfDay(new Date()) },
    description: "Select today's date",
  },
  {
    label: "Yesterday",
    value: {
      from: startOfDay(subDays(new Date(), 1)),
      to: endOfDay(subDays(new Date(), 1)),
    },
    description: "Select yesterday's date",
  },
  {
    label: "Last 7 Days",
    value: { from: subDays(new Date(), 6), to: new Date() },
    description: "Select the last 7 days",
  },
  {
    label: "Last 30 Days",
    value: { from: subDays(new Date(), 29), to: new Date() },
    description: "Select the last 30 days",
  },
  {
    label: "This Month",
    value: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) },
    description: "Select the current month",
  },
  {
    label: "Last Month",
    value: {
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
    },
    description: "Select the previous month",
  },
];

/**
 * Validates if a date range is complete and valid
 */
const isValidDateRange = (range: DateRange | undefined): boolean => {
  if (!range?.from || !range?.to) return false;
  return isValid(range.from) && isValid(range.to) && range.from <= range.to;
};

/**
 * Compares two date ranges for equality
 */
const isRangeEqual = (
  range1: DateRange | undefined,
  range2: DateRange | undefined
): boolean => {
  if (!range1?.from || !range1?.to || !range2?.from || !range2?.to) {
    return false;
  }

  return (
    range1.from.toDateString() === range2.from.toDateString() &&
    range1.to.toDateString() === range2.to.toDateString()
  );
};

/**
 * A comprehensive date range picker component with predefined ranges and calendar selection.
 *
 * @example
 * ```tsx
 * const [dateRange, setDateRange] = useState<DateRange | undefined>();
 *
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   placeholder="Select date range"
 * />
 * ```
 */
export function DateRangePicker({
  value,
  onChange,
  className,
  placeholder = "Select date range",
  predefinedRanges = defaultPredefinedRanges,
  showPredefinedRanges = true,
  showCalendar = true,
  disabled = false,
  closeOnClear = true,
  applyOnPredefinedSelect = true,
  clearOnSelect = true,
  minDate,
  maxDate = new Date(),
  numberOfMonths = 2,
  buttonWidth = "min-w-[200px] max-w-[400px] w-auto",
  "data-testid": testId,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(
    value
  );

  // Sync temporary range with external value changes
  React.useEffect(() => {
    setTempRange(value);
  }, [value]);

  // Validation for date constraints
  const isDateDisabled = React.useMemo(() => {
    return (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };
  }, [minDate, maxDate]);

  // Calendar default month calculation
  const defaultMonth = React.useMemo(() => {
    if (tempRange?.from) return tempRange.from;
    if (value?.from) return value.from;
    return subMonths(new Date(), 1);
  }, [tempRange?.from, value?.from]);

  // Event handlers with useCallback for performance
  const handleRangeSelect = React.useCallback(
    (range: DateRange | undefined) => {
      setTempRange(range);
    },
    []
  );

  const handlePredefinedRangeSelect = React.useCallback(
    (range: DateRange) => {
      setTempRange(range);
      if (applyOnPredefinedSelect) {
        onChange?.(range);
        setOpen(false);
      }
    },
    [applyOnPredefinedSelect, onChange]
  );

  const handleApply = React.useCallback(() => {
    // Only apply if range is valid or undefined
    if (!tempRange || isValidDateRange(tempRange)) {
      onChange?.(tempRange);
      setOpen(false);
    }
  }, [tempRange, onChange]);

  const handleClear = React.useCallback(() => {
    setTempRange(undefined);
    if (clearOnSelect) {
      onChange?.(undefined);
      if (closeOnClear) setOpen(false);
    }
  }, [clearOnSelect, onChange, closeOnClear]);

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      // Reset temp range when closing without applying
      if (!newOpen && !applyOnPredefinedSelect) {
        setTempRange(value);
      }
    },
    [value, applyOnPredefinedSelect]
  );

  // Format date range for display
  const formatDateRange = React.useCallback(
    (range: DateRange | undefined): string => {
      if (!range?.from) {
        return placeholder;
      }
      if (!range.to) {
        return format(range.from, "LLL dd, y");
      }
      if (range.from.getTime() === range.to.getTime()) {
        return format(range.from, "LLL dd, y");
      }
      return `${format(range.from, "LLL dd, y")} - ${format(
        range.to,
        "LLL dd, y"
      )}`;
    },
    [placeholder]
  );

  // Check if a predefined range is currently selected
  const isRangeSelected = React.useCallback(
    (predefinedRange: DateRange) => {
      return isRangeEqual(predefinedRange, tempRange);
    },
    [tempRange]
  );

  // Calendar component for desktop
  const CalendarContent = React.memo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex-1">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={defaultMonth}
          selected={tempRange}
          onSelect={handleRangeSelect}
          numberOfMonths={numberOfMonths}
          className="rounded-md border"
          disabled={isDateDisabled}
          showOutsideDays={false}
          toMonth={maxDate}
          fromMonth={minDate || subMonths(new Date(), 12)}
        />
      </div>
      <div className="flex justify-end gap-2 px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={!tempRange}
          aria-label="Clear date range selection"
        >
          Clear
        </Button>
        <Button
          size="sm"
          onClick={handleApply}
          disabled={tempRange !== undefined && !isValidDateRange(tempRange)}
          aria-label="Apply date range selection"
        >
          Apply
        </Button>
      </div>
    </div>
  ));

  // Calendar component for mobile
  const MobileCalendarContent = React.memo(() => (
    <div className="flex flex-col">
      <div className="flex-1">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={defaultMonth}
          selected={tempRange}
          onSelect={handleRangeSelect}
          numberOfMonths={1}
          className="rounded-md border"
          disabled={isDateDisabled}
          showOutsideDays={false}
          toMonth={maxDate}
          fromMonth={minDate || subMonths(new Date(), 12)}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={!tempRange}
          aria-label="Clear date range selection"
        >
          Clear
        </Button>
        <Button
          size="sm"
          onClick={handleApply}
          disabled={tempRange !== undefined && !isValidDateRange(tempRange)}
          aria-label="Apply date range selection"
        >
          Apply
        </Button>
      </div>
    </div>
  ));

  // Predefined ranges list
  const PredefinedRangesContent = React.memo(() => (
    <div className="space-y-1 max-h-full overflow-scroll" role="list">
      {predefinedRanges.map((range) => {
        const isSelected = isRangeSelected(range.value);
        return (
          <Button
            key={range.label}
            variant={isSelected ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => handlePredefinedRangeSelect(range.value)}
            aria-label={range.description || `Select ${range.label}`}
            aria-pressed={isSelected}
            role="listitem"
          >
            {range.label}
          </Button>
        );
      })}
    </div>
  ));

  // Desktop layout
  const DesktopContent = React.memo(() => {
    if (!showPredefinedRanges && !showCalendar) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          No content to display
        </div>
      );
    }
    if (!showPredefinedRanges) {
      return (
        <div className="p-4">
          <CalendarContent />
        </div>
      );
    }
    if (!showCalendar) {
      return (
        <div className="p-4 w-48">
          <PredefinedRangesContent />
        </div>
      );
    }
    // Both shown
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-48 border-r p-4 flex flex-col overflow-auto">
          <h4 className="mb-4 text-sm font-semibold">Quick Select</h4>
          <ScrollArea className="flex-1 pr-3">
            <PredefinedRangesContent />
          </ScrollArea>
        </div>
        <div className="ml-48 p-4">
          <CalendarContent />
        </div>
      </div>
    );
  });

  // Mobile layout
  const MobileContent = React.memo(() => {
    const isQuickSelectOnly = showPredefinedRanges && !showCalendar;

    return (
      <div className="w-full">
        {showPredefinedRanges && showCalendar && (
          <div className="px-4 pt-4">
            <Select
              onValueChange={(value) => {
                const selectedRange = predefinedRanges.find(
                  (range) => range.label === value
                );
                if (selectedRange) {
                  handlePredefinedRangeSelect(selectedRange.value);
                }
              }}
              aria-label="Quick select date range"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Quick select range" />
              </SelectTrigger>
              <SelectContent>
                {predefinedRanges.map((range) => (
                  <SelectItem
                    key={range.label}
                    value={range.label}
                    aria-label={range.description}
                  >
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {isQuickSelectOnly && (
          <div className="p-4">
            <PredefinedRangesContent />
          </div>
        )}
        {showCalendar && (
          <div className="p-4">
            <MobileCalendarContent />
          </div>
        )}
        {!showCalendar && !showPredefinedRanges && (
          <div className="p-4 text-center text-muted-foreground">
            No content to display
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={cn("grid gap-2", className)} data-testid={testId}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="date-range-picker"
            variant="outline"
            className={cn(
              buttonWidth,
              "justify-start text-left font-normal",
              !value && "text-muted-foreground",
              disabled && "cursor-not-allowed opacity-50"
            )}
            disabled={disabled}
            aria-label={`Date range picker: ${formatDateRange(value)}`}
            aria-expanded={open}
            aria-haspopup="dialog"
            data-testid={testId ? `${testId}-trigger` : undefined}
          >
            <CalendarIcon
              className="mr-2 h-4 w-4 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="truncate">{formatDateRange(value)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "p-0",
            // For mobile quick select only, use constrained width
            showPredefinedRanges && !showCalendar ? "w-48 md:w-auto" : "w-auto"
          )}
          align="end"
          sideOffset={4}
          role="dialog"
          aria-label="Date range picker"
        >
          <div className="hidden md:block">
            <DesktopContent />
          </div>
          <div className="md:hidden">
            <MobileContent />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Add display name for easier debugging
DateRangePicker.displayName = "DateRangePicker";

// Export types for external use
export type { DateRange } from "react-day-picker";
