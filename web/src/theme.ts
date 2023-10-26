import { Button, Input, createTheme } from "@mantine/core";

export const theme = createTheme({
  defaultRadius: 5,
  activeClassName: "",
  black: "#180D27",
  spacing: { md: "12px" },
  colors: {
    ruby: [
      "#00676C",
      "#08787D",
      "#005357",
      "#00676C",
      "#08787D",
      "#005357",
      "#00676C",
      "#08787D",
      "#005357",
      "#005357",
    ],
    purpul: [
      "#D9C6F4",
      "#E8DBFB",
      "#BFA6E3",
      "#D9C6F4",
      "#E8DBFB",
      "#BFA6E3",
      "#D9C6F4",
      "#E8DBFB",
      "#BFA6E3",
      "#D9C6F4",
    ],
  },
  primaryColor: "ruby",
  fontFamily: "Onest, sans-serif",

  headings: {
    fontFamily: "Spectral, serif",
    sizes: {
      h1: { fontSize: "80px", fontWeight: "500" },
      h2: { fontSize: "50px", fontWeight: "500" },
    },
  },

  components: {
    Button: Button.extend({
      defaultProps: {
        size: "lg",
      },
    }),
    Input: Input.extend({
      defaultProps: {
        size: "lg",
      },
    }),
  },
});
