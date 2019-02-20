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
  heading: {
    level: {
      2: {
        font: {
          weight: 400,
        },
      },
      3: {
        font: {
          weight: 350,
        },
      },
      4: {
        font: {
          weight: 300,
        },
      },
      5: {
        font: {
          weight: 300,
        },
      },
      6: {
        font: {
          weight: 300,
        },
      },
    },
    weight: 500,
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
