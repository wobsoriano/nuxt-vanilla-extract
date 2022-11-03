import { createTheme, style, globalStyle } from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'yellow',
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

globalStyle('html, body', {
  margin: 0,
});
