export const arrayToUrl = (
  ...args: Array<string | number | undefined | null | string[]>
) => {
  return args.flat().filter(Boolean).join("/");
};

export const arrayToString = (
  ...args: Array<string | number | undefined | null>
) => {
  return args.flat().filter(Boolean).join(" ");
};
