import {
  TimeKitOptions,
  MonthFormat,
  WeekdayFormat,
  Weekday,
  Month,
} from "./types";
import { format, getDay, getMonth, getYear } from "date-fns";
import {
  zonedTimeToUtc,
  utcToZonedTime,
  format as formatTz,
} from "date-fns-tz";

// Define weekdays in different formats
const weekdays: Weekday = {
  short: ["S", "M", "T", "W", "Th", "F", "S"],
  medium: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  long: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

// Define months in different formats
const months: Month = {
  numerical: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  short: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  medium: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  long: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

let counter = 0;
const defaultTimezone = "Europe/Lisbon"; // Default timezone to Lisbon

/**
 * TimeKit Class.
 */
export default class TimeKit {
  id: number;
  createdDate: Date;
  time: string;
  day: number;
  month: number;
  year: number;
  weekday: number;
  weekdayFormat: WeekdayFormat;
  monthFormat: MonthFormat;
  timezone: string;

  /**
   * Initializes a new TimeKit instance.
   * @param options - Options to initialize the TimeKit instance.
   */
  constructor(options: TimeKitOptions = {}) {
    this.id = counter++;
    this.timezone = options.timezone ?? defaultTimezone;
    const now = utcToZonedTime(new Date(), this.timezone);
    this.createdDate = now;
    this.time =
      options.time ?? format(now, "HH:mm:ssXXX", { timeZone: this.timezone });
    this.day = options.day ?? getDay(now);
    this.month = options.month ?? getMonth(now) + 1;
    this.year = options.year ?? getYear(now);
    this.weekday = getDay(now) + 1;
    this.weekdayFormat = options.weekdayFormat ?? "short";
    this.monthFormat = options.monthFormat ?? "numerical";
  }

  /**
   * Formats the current weekday based on the specified format.
   * @returns The formatted weekday string.
   */
  formatWeekday(): string {
    return weekdays[this.weekdayFormat][this.weekday - 1];
  }

  /**
   * Formats the current month based on the specified format.
   * @returns The formatted month string.
   */
  formatMonth(): string {
    return months[this.monthFormat][this.month - 1];
  }

  /**
   * Converts the current time to the specified timezone.
   * @param timezone - The target timezone.
   * @returns The time converted to the target timezone.
   */
  convertToTimezone(timezone: string): string {
    const date = new Date(
      `${this.year}-${this.month}-${this.day}T${this.time}`
    );
    const zonedDate = utcToZonedTime(date, timezone);
    return formatTz(zonedDate, "yyyy-MM-dd HH:mm:ssXXX", {
      timeZone: timezone,
    });
  }

  /**
   * Sets the timezone for the TimeKit instance.
   * @param timezone - The new timezone.
   */
  setTimezone(timezone: string): void {
    this.timezone = timezone;
    const now = utcToZonedTime(new Date(), this.timezone);
    this.createdDate = now;
    this.time = format(now, "HH:mm:ssXXX", { timeZone: this.timezone });
    this.day = getDay(now);
    this.month = getMonth(now) + 1;
    this.year = getYear(now);
    this.weekday = getDay(now) + 1;
  }

  /**
   * Updates the time of the TimeKit instance.
   * @param time - The new time string.
   */
  updateTime(time: string): void {
    this.time = time;
  }

  /**
   * Sets a new day for the TimeKit instance.
   * @param newDay - The new day number.
   */
  setDay(newDay: number): void {
    this.day = newDay;
  }

  /**
   * Sets a new month for the TimeKit instance.
   * @param newMonth - The new month number.
   */
  setMonth(newMonth: number): void {
    this.month = newMonth;
  }

  /**
   * Sets a new year for the TimeKit instance.
   * @param newYear - The new year number.
   */
  setYear(newYear: number): void {
    this.year = newYear;
  }

  /**
   * Sets a new weekday format for the TimeKit instance.
   * @param newFormat - The new weekday format.
   */
  setWeekdayFormat(newFormat: WeekdayFormat): void {
    this.weekdayFormat = newFormat;
  }

  /**
   * Sets a new month format for the TimeKit instance.
   * @param newFormat - The new month format.
   */
  setMonthFormat(newFormat: MonthFormat): void {
    this.monthFormat = newFormat;
  }
}

/**
 * Updates the time of a given TimeKit instance.
 * @param date - The TimeKit instance to update.
 * @param time - The new time string.
 * @returns The updated TimeKit instance.
 */
export function updateTime(date: TimeKit, time: string): TimeKit {
  date.updateTime(time);
  return date;
}

/**
 * Sets a new day for a given TimeKit instance.
 * @param date - The TimeKit instance to update.
 * @param newDay - The new day number.
 */
export function setDay(date: TimeKit, newDay: number): void {
  date.setDay(newDay);
}

/**
 * Sets a new month for a given TimeKit instance.
 * @param date - The TimeKit instance to update.
 * @param newMonth - The new month number.
 */
export function setMonth(date: TimeKit, newMonth: number): void {
  date.setMonth(newMonth);
}

/**
 * Sets a new year for a given TimeKit instance.
 * @param date - The TimeKit instance to update.
 * @param newYear - The new year number.
 */
export function setYear(date: TimeKit, newYear: number): void {
  date.setYear(newYear);
}

/**
 * Sets a new weekday format for a given TimeKit instance.
 * @param date - The TimeKit instance to update.
 * @param newFormat - The new weekday format.
 */
export function setWeekdayFormat(
  date: TimeKit,
  newFormat: WeekdayFormat
): void {
  date.setWeekdayFormat(newFormat);
}

/**
 * Sets a new month format for a given TimeKit instance.
 * @param date - The TimeKit instance to update.
 * @param newFormat - The new month format.
 */
export function setMonthFormat(date: TimeKit, newFormat: MonthFormat): void {
  date.setMonthFormat(newFormat);
}
