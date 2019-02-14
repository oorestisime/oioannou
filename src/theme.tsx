import { deepFreeze } from "grommet/utils"

export const customTheme = deepFreeze({
  global: {
    colors: {
      background: "#ffffff",
      brand: "#89bdd3",
    },
    font: {
      family: "Montserrat, Arial, sans-serif",
    },
  },
  anchor: {
    color: {
      dark: "#89bdd3",
      light: "#89bdd3",
    },
  },
  tab: {
    active: {
      color: "white",
    },
    color: "white",
  },
})
