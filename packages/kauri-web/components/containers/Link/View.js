// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import nextRoutes from 'next-routes'

import type { TrackAnalyticsPayload } from './Module'

const Router = nextRoutes().Router

type LinkProps = {
  as?: ?string,
  href?: ?string,
  useAnchorTag?: boolean,
  children: any,
  trackAnalyticsAction: TrackAnalyticsPayload => void,
}

const A = styled.a`
  color: inherit;
  :hover {
    color: inherit;
  }
`

class Link extends React.Component<LinkProps> {
  handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    const url = this.props.as || this.props.href || this.props.children.props.href
    this.props.trackAnalyticsAction({ url })
    Router.pushRoute(url)
  }

  render () {
    const url = this.props.as || this.props.href || this.props.children.props.href
    if (this.props.useAnchorTag) {
      return (
        <A href={url} onClick={this.handleClick}>
          {this.props.children}
        </A>
      )
    }
    return React.cloneElement(this.props.children, {
      onClick: this.handleClick,
    })
  }
}

export default Link
export { Link }
