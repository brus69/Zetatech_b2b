import { createTheme } from "@mantine/core";

export const theme = createTheme({
  defaultRadius: 0,
  activeClassName: "",

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h2: { fontSize: '58px', fontWeight: '500' },
    },
  },
});
