// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { SortSelect } from '../../../../OpenRequests/OpenRequestsFilter/View'
import type { Sort } from '../../../../OpenRequests/OpenRequestsFilter/View'

const Container = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
`

const Count = styled.span`
  text-transform: uppercase;
  margin-left: auto;
  font-weight: 500;
  font-size: 12px;
`

type Result = {
  data: {
    searchArticles: {
      content: Array<?ArticleDTO>,
    },
  },
}

type State = {
  sort: ?Sort,
}

type Props = {
  refetch: ({ sort: ?Sort }) => Promise<Result>,
  count: ?number,
}

class CategoryArticlesFilter extends Component<Props, State> {
  static Container = Container
  static Count = Count

  state = {
    sort: null,
  }

  handleSearch = async ({ sort }: { sort: Sort }): Promise<void> => {
    await this.setState({ sort: sort || this.state.sort })
    await this.props.refetch({ sort: this.state.sort })
  }

  handleSortSelect = (sort: Sort): Promise<void> => this.handleSearch({ sort })

  render() {
    return (
      <CategoryArticlesFilter.Container>
        <SortSelect topicHomepage handleSortSelect={this.handleSortSelect} />
        <CategoryArticlesFilter.Count>
          {this.props.count} {this.props.count === 1 ? 'Article' : 'Articles'}
        </CategoryArticlesFilter.Count>
      </CategoryArticlesFilter.Container>
    )
  }
}

export default CategoryArticlesFilter
