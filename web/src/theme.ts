/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FileInput,
  Input,
  Select,
  createTheme,
  rem,
  Button,
} from "@mantine/core";

const defaultInput = {
  defaultProps: {
    size: "md",
  },
  // @ts-ignore
  vars: (theme, props: any) => {
    if (props.size === "md") {
      return {
        wrapper: {
          "--input-height": rem(50),
        },
        input: {
          "--input-padding-right": rem(0),
          "--input-padding-y": rem(0),
        },
      };
    }
    return { root: {} };
  },
};

export const theme = createTheme({
  defaultRadius: 5,
  activeClassName: "",
  black: "#180D27",
  spacing: { md: "10" },

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
    // @ts-ignore
    Button: Button.extend({
      defaultProps: {
        size: "md",
      },
      classNames: {
        root: "font-normal",
      },
      vars: (theme, props) => {
        if (props.size === "md") {
          return {
            root: {
              "--button-height": rem(50),
              "--button-padding-x": rem(26),
              "--button-fz": rem(16),
            },
          };
        }
        return { root: {} };
      },
    }),
    // @ts-ignore
    Input: Input.extend(defaultInput),
    Select: Select.extend(defaultInput),
    // @ts-ignore
    FileInput: FileInput.extend(defaultInput),
  },
});
