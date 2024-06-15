/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs from "dayjs";

type IAlertProps = {
  // to launch push alert
  description: React.ReactNode;
  lifetime?: number;
  title?: React.ReactNode;
  visible?: boolean;
  action?: React.ReactNode;
};

declare type NumberOrString = number | string;

export const checkIfAllExistWithCeros = (...args: any[]) => {
  return args.every((item) => !!item || item === 0 || item === "0")
    ? true
    : undefined;
};

export const checkIfAllExist = (...args: (string | number)[]) => {
  return args.every((item) => !!item) ? true : undefined;
};

export const truncate = (string = "", strLen = 0, separator = "...") => {
  if (!string || string?.length <= strLen) return string;

  const sepLen = separator.length;
  const charsToShow = strLen - sepLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return (
    string.substr(0, frontChars) +
    separator +
    string.substr(string.length - backChars)
  );
};

export const styleNullValue = (value: NumberOrString) => {
  if (!value && value !== "0" && value !== 0) {
    return "-" as const;
  }
  return value;
};

export const styleIsNaNValue = (value: NumberOrString, isNaNValue = false) => {
  if (isNaNValue) return "-" as const;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value as unknown as number)) {
    return "-" as const;
  }
  return value;
};

export function getNetworkIcon(networkName: string): string {
  return `${
    import.meta.env.VITE_APP_PUBLIC_FILES_BASE_URL
  }icons/networks/${networkName}_icon.svg`;
}

export function getPriceSourceIcon(priceSource: string): string {
  return `${
    import.meta.env.VITE_APP_PUBLIC_FILES_BASE_URL
  }icons/pricing-feeds/${priceSource.toLowerCase()}_icon.svg`;
}

export const nullifyNotString = (data: string) => {
  if (typeof data === "string" && data !== "Invalid Date") {
    return data;
  }
  return undefined;
};

export function getDelimiterReport() {
  return import.meta.env.VITE_APP_DELIMITER_REPORTS || ",";
}

export async function asyncForMap<Item = unknown, Output = unknown>(
  arr: Item[],
  cb: (item: Item, index: number) => Promise<Output>
) {
  const output: Output[] = [];

  for (let index = 0; index < arr.length; index++) {
    const item = arr[index];
    const result = await cb(item, index);
    output.push(result);
  }

  return output;
}

export const createOptionsFromEnumAndLabelMap: CreateOptionsFromEnumAndLabelMapType =
  (EnumObject, mapLabel) => {
    return [
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...Object.keys(EnumObject)
        ?.map((key) => {
          return {
            // @ts-ignore
            label: mapLabel?.[EnumObject[key]],
            // @ts-ignore
            value: EnumObject[key],
          };
        })
        .filter((item) => !!item.label),
    ];
  };
// extract type from function
export type CreateOptionsFromEnumAndLabelMapType = <
  E extends NumberOrString,
  K extends string,
  J extends string
>(
  EnumObject: { [key in K]: E },
  mapLabel: Record<E, J>
) => { value: E; label: J }[];

export const removeKeysWithUndefinedValues = (obj: { [key: string]: any }) => {
  return Object.keys(obj)
    .filter((key) => {
      return typeof obj[key] !== "undefined";
    })
    .reduce(
      (result, key) => ({
        ...result,
        [key]: obj[key],
      }),
      {}
    );
};

export const createHandledFn = ({
  fn,
  alertFn,
  finallyFn,
}: {
  alertFn: (a: IAlertProps) => void;
  fn: () => Promise<void>;
  finallyFn?: () => Promise<void>;
}) => {
  return async () => {
    try {
      await fn();
    } catch (err: any) {
      alertFn({ description: err.message });
    } finally {
      if (finallyFn) {
        const fnF = createHandledFn({ fn: finallyFn, alertFn });
        await fnF?.();
      }
    }
  };
};

export const addCeroAtLeft = (number: `${number}`) => {
  if (number.length === 1) {
    return `0${number}`;
  }
  return number;
};

export const expiresIn2 = (expiresAt: Date | string | dayjs.Dayjs) => {
  let value: string;
  const diffInDay = dayjs(expiresAt).diff(dayjs(), "day");
  const diffInHour = dayjs(expiresAt).diff(dayjs(), "hour");

  const isAboutToExpire = diffInDay <= 0;

  const diffInMinute = dayjs(expiresAt).diff(dayjs(), "minute");

  const diffInSecond = dayjs(expiresAt).diff(dayjs(), "second");
  const isExpired = diffInSecond < 0;
  if (diffInMinute > 0)
    value = `${addCeroAtLeft(`${diffInDay}`)}d-${addCeroAtLeft(
      `${diffInHour - diffInDay * 24}`
    )}:${addCeroAtLeft(`${diffInMinute - diffInHour * 60}`)}:${addCeroAtLeft(
      `${diffInSecond - diffInMinute * 60}`
    )}`;

  const convertToCeroIfExpired = (countItem: string) => {
    if (isExpired) {
      return "00";
    }
    return countItem;
  };

  return {
    // @ts-ignore
    value,
    isAboutToExpire,
    data: {
      days: convertToCeroIfExpired(addCeroAtLeft(`${diffInDay}`)),
      hours: convertToCeroIfExpired(
        addCeroAtLeft(`${diffInHour - diffInDay * 24}`)
      ),
      minutes: convertToCeroIfExpired(
        addCeroAtLeft(`${diffInMinute - diffInHour * 60}`)
      ),
      seconds: convertToCeroIfExpired(
        addCeroAtLeft(`${diffInSecond - diffInMinute * 60}`)
      ),
    },
    isExpired,
  };
};
