export interface TimeKitOptions {
  time?: string;
  day?: number;
  month?: number;
  year?: number;
  weekdayFormat?: WeekdayFormat;
  monthFormat?: MonthFormat;
  timezone?: string;
}

export interface Time {
  hour: number;
  minute: number;
  format: "12hr" | "24hr";
  timezone?: string;
}

export type WeekdayFormat = "short" | "medium" | "long";

export type MonthFormat = "numerical" | "short" | "medium" | "long";

export interface Weekday {
  short: string[];
  medium: string[];
  long: string[];
}

export interface Month {
  numerical: number[];
  short: string[];
  medium: string[];
  long: string[];
}
