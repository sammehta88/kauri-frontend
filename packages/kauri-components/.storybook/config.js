import { configure } from '@storybook/react'

function loadStories() {
  const req = require.context('../components', true, /.bs.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
