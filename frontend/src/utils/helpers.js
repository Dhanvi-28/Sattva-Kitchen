/**
 * General-purpose helpers shared across components/hooks/services.
 */

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

export const formatDate = (date, locale = "en-US") =>
  new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const isEmpty = (value) =>
  value === null || value === undefined || value === "" ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "object" && Object.keys(value).length === 0);
