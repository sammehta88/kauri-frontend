import { configure } from '@storybook/react'
import 'storybook-chromatic'

function loadStories() {
  const req = require.context('../stories', true, /.bs.js$/)
  req.keys().forEach(filename => req(filename))
  const jsreq = require.context('../js-stories', true, /.stories.js$/)
  jsreq.keys().forEach(filename => jsreq(filename))
}

configure(loadStories, module)
