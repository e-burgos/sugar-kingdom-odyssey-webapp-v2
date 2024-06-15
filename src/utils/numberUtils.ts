/* eslint-disable @typescript-eslint/ban-ts-comment */
import BigNumber from "bignumber.js";
import { checkIfAllExist } from "./commonUtils";
import FormatStringNumbers from "./stringNumberUtils";

export const FALLBACK_MONEY_VALUE = "-";

export const toFixedPrecision = (n: number, digits = 2): string =>
  (Math.round(n * 10 ** digits) / 10 ** digits).toFixed(digits);

export const hasMorePrecision = (n: number, digits = 2): boolean => {
  if (new BigNumber(n).decimalPlaces() !== null)
    return Number(new BigNumber(n).decimalPlaces()) > digits;
  return false;
};

export const hasMoreDecimals = (n: number | string): boolean => {
  const decimals = n.toString().split(".")[1] || "";
  return Number(`0.${decimals}`) < 0.01;
};

/**
 * Formats a numeric value as a monetary string.
 *
 * @param {number | string} value - The raw value to format.
 * @param {number | 'auto'} [digits=2] - The number of digits to round to, or 'auto' for automatic determination.
 * @param {boolean} [useParentheses=false] - Whether to use parentheses for negative values.
 * @param {boolean} [useCurrencySymbol=false] - Whether to prefix a currency symbol.
 * @param {string} [currencySymbol='$'] - The currency symbol to prefix, used only if useCurrencySymbol is true.
 * @returns {string} - The formatted monetary value.
 */
export const formatToMoney = (
  value: number | string,
  digits: number | "auto" = 2,
  useParentheses?: boolean,
  useCurrencySymbol = false,
  currencySymbol = "$"
): string => {
  const rawValue = new BigNumber(value);

  if (rawValue.isNaN()) return FALLBACK_MONEY_VALUE;

  if (digits === "auto") digits = hasMoreDecimals(rawValue.toNumber()) ? 8 : 2;

  const formatStringNumber = new FormatStringNumbers(value).dp(digits);

  if (useParentheses) formatStringNumber.useParentheses();

  return useCurrencySymbol
    ? `${currencySymbol}${formatStringNumber.toString()}`
    : formatStringNumber.toString();
};

export function numberWithCommas(value: number | string) {
  const nf = new Intl.NumberFormat("en-US");
  return nf.format(Number(value));
}

export const formatUTCDate2 = (date: string | number | Date): string => {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "UTC",
  });
};

export const formatUTCDate = (date: string | number | Date): string => {
  return `${new Date(date).toLocaleDateString()}
  ${new Date(date).getUTCHours()}:${
    new Date(date).getUTCMinutes() < 10 && "0"
  }${new Date(date).getUTCMinutes()} UTC`;
};

/**
 *
 * @param value Raw value
 * @param {Object} options Raw value
 * @returns Formatted value
 */
export const formatToPercentage = (
  value: number | string,
  options?: {
    digits?: number;
    withSign?: boolean;
    showZero?: boolean;
  }
): string => {
  const { digits = 2, withSign = true, showZero = false } = options || {};
  const rawValue = new BigNumber(value);
  if ((rawValue.isZero() && !showZero) || rawValue.isNaN()) return "-";

  let valueToReturn = rawValue.toFixed(digits);

  if (rawValue.toNumber() === 0) valueToReturn = "0";
  else if (rawValue.toNumber() < 0.01) valueToReturn = "~0.01";
  return `${valueToReturn}${withSign ? " %" : ""}`;
};

/**
 * Checks if a given number has more than the allowed decimals or eight by default.
 *
 * @param amount - The number to check.
 * @returns True if the number has more than the allowed decimal places, false otherwise.
 */
export const hasMoreThanAllowedDecimalPlaces = (
  amount: number,
  customDecimals = 8
) => {
  const decimalPlaces = new BigNumber(amount).decimalPlaces();
  return decimalPlaces !== null && decimalPlaces > customDecimals;
};

export const FormattedNumberField = (
  value: string | number,
  optionals?: {
    defaultNullValue?: string;
    deep?: number;
    outputFormat?: (value: string) => string;
  }
) => {
  if (!checkIfAllExist(value) || Number.isNaN(Number(value))) {
    return optionals?.defaultNullValue || "-";
  }
  const { outputFormat, deep } = optionals || {};
  let result =
    Number(value) === 0
      ? "0"
      : new FormatStringNumbers(value).dp(deep || 2).toString();

  // If value is Zero remove decimals section
  if (result !== "0" && deep === 0) {
    result = result.split(".")?.[0] || result;
  }

  if (outputFormat && typeof outputFormat === "function") {
    return outputFormat(result);
  }
  return result;
};
