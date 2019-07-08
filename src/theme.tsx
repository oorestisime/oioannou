import { deepFreeze } from "grommet/utils"
import sun from "./images/sun.png"
import moon from "./images/moon.png"

const checkboxCheckStyle = (checked: boolean) => `
  background: ${
    checked
      ? `url("${moon}") no-repeat #757575 15%`
      : `url("${sun}") no-repeat #757575 90%`
  } ;
  background-size: 20px 20px;
  border-color: #757575;
`

export const customTheme = deepFreeze({
  global: {
    colors: {
      background: "#ffffff",
      brand: "#89bdd3",
      "toggle-bg": "#757575",
      "toggle-knob": "white",
      control: {
        dark: "#757575",
        light: "white",
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
  checkBox: {
    border: {
      color: {
        light: "toggle-bg",
      },
    },
    color: {
      light: "toggle-knob",
    },
    check: {
      radius: "2px",
    },
    hover: {
      border: {
        color: undefined,
      },
    },
    toggle: {
      background: "toggle-bg",
      color: {
        light: "toggle-knob",
      },
      size: "60px",
      knob: {
        extend: `
          top: -4px;
          box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24);
        `,
      },
      extend: ({ checked }: { checked: boolean }) => `
        ${checkboxCheckStyle(checked)}
        height: 24px;
      `,
    },
    size: "28px",
  },
})
