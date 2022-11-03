import { createTheme, style } from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'red',
  },
  font: {
    body: 'arial',
  },
})

export const exampleStyle = style({
  backgroundColor: vars.color.brand,
  fontFamily: vars.font.body,
  color: 'white',
  padding: 10,
})

