import { deepFreeze } from "grommet/utils";
import { createGlobalStyle } from "styled-components";
import "typeface-lato";
export const GlobalTheme = createGlobalStyle`
  body {
    margin: 0;
  }
`;
export const customTheme = deepFreeze({
  global: {
    colors: {
      background: "#ffffff",
      brand: "#89bdd3"
    },
    font: {
      family: "Lato, Arial, sans-serif"
    }
  },
  anchor: {
    color: {
      dark: "#89bdd3",
      light: "#89bdd3"
    }
  }
});
