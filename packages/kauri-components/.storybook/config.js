import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import themeConfig from '../lib/theme-config'
import 'storybook-chromatic'

addDecorator(story => (
  <ThemeProvider theme={themeConfig}>
    { story() }
  </ThemeProvider>
))

function loadStories() {
  const req = require.context('../stories', true, /.bs.js$/)
  req.keys().forEach(filename => req(filename))
  const jsreq = require.context('../js-stories', true, /.stories.js$/)
  jsreq.keys().forEach(filename => jsreq(filename))
}


configure(loadStories, module)
