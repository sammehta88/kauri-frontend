// @flow
import React, { Component } from 'react'
import styled from 'styled-components'

type Props = {
  data: {
    searchArticles?: {
      content: Array<?ArticleDTO>,
    },
  },
  routeChangeAction: string => void,
}

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

class Homepage extends Component<Props> {
  static ContentContainer = ContentContainer

  render () {
    return (
      <section>
          Test
      </section>
    )
  }
}

export default Homepage
