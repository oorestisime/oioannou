import { deepFreeze } from "grommet/utils"
import { css } from "styled-components"

const checkboxCheckStyle = css`
  background-color: #2196f3;
  border-color: #2196f3;
`

export const customTheme = deepFreeze({
  global: {
    colors: {
      background: "#ffffff",
      brand: "#89bdd3",
      control: {
        dark: "brand",
        light: "brand",
      },
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
})
