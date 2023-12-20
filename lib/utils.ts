import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import qs from 'query-string';
// import { BADGE_CRITERIA } from '@/constants';
// import { BadgeCounts } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date) => {
  const now = new Date();
  const timeDifference: number = now.getTime() - createdAt.getTime();

  // Define time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  // Calculate time ago
  if (timeDifference < minute) {
    return "just now";
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < month) {
    const daysAgo = Math.floor(timeDifference / day);
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (timeDifference < year) {
    const monthsAgo = Math.floor(timeDifference / month);
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / year);
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  }
};

export const formatAndDivideNumber = (inputNumber: number): string => {
  if (inputNumber >= 1000000) {
    return (inputNumber / 1000000).toFixed(1) + "M";
  } else if (inputNumber >= 1000) {
    return (inputNumber / 1000).toFixed(1) + "k";
  } else {
    return inputNumber.toString();
  }
};

export const getJoinedDate = (date: Date): string => {
  // Extract the month and year from the Date object
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `${month} ${year}`;

  return joinedDate;
};

// interface UrlQueryParams {
//   params: string;
//   key: string;
//   value: string | null;
// }

// export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
//   const currentUrl = qs.parse(params);
//   currentUrl[key] = value;

//   return qs.stringifyUrl(
//     {
//       url: window.location.pathname,
//       query: currentUrl
//     },
//     { skipNull: true }
//   );
// };

// interface removeUrlQueryParams {
//   params: string;
//   keysToRemove: string[];
// }

// export const removeKeysFromQuery = ({
//   params,
//   keysToRemove
// }: removeUrlQueryParams) => {
//   const currentUrl = qs.parse(params);

//   keysToRemove.forEach((key) => {
//     delete currentUrl[key];
//   });

//   return qs.stringifyUrl(
//     {
//       url: window.location.pathname,
//       query: currentUrl
//     },
//     { skipNull: true }
//   );
// };

// interface IBadgeParams {
//   criteria: {
//     type: keyof typeof BADGE_CRITERIA;
//     count: number;
//   }[];
// }

// export const assignBadges = (params: IBadgeParams) => {
//   const badgeCounts: BadgeCounts = {
//     BRONZE: 0,
//     GOLD: 0,
//     SILVER: 0
//   };

//   const { criteria } = params;

//   criteria.forEach((item) => {
//     const { type, count } = item;
//     const badgeLevels: any = BADGE_CRITERIA[type];

//     Object.keys(badgeLevels).forEach((level: any) => {
//       if (count >= badgeLevels[level]) {
//         badgeCounts[level as keyof BadgeCounts] += 1;
//       }
//     });
//   });

//   return badgeCounts;
// };

export function processJobTitle(title: string | undefined | null): string {
  // Check if title is undefined or null
  if (title === undefined || title === null) {
    return "No Job Title";
  }

  // Split the title into words
  const words = title.split(" ");

  // Filter out undefined or null and other unwanted words
  const validWords = words.filter((word) => {
    return (
      word !== undefined &&
      word !== null &&
      word.toLowerCase() !== "undefined" &&
      word.toLowerCase() !== "null"
    );
  });

  // If no valid words are left, return the general title
  if (validWords.length === 0) {
    return "No Job Title";
  }

  // Join the valid words to create the processed title
  const processedTitle = validWords.join(" ");

  return processedTitle;
}
