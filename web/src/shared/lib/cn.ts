import { ClassNameValue, twMerge } from "tailwind-merge";

export const cn = (...args: ClassNameValue[]) => {
  return twMerge(args.filter(Boolean));
};
