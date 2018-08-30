// @flow
import React, { Component } from 'react'
import { Tabs } from 'antd'
import { Router } from '../../../routes'
import { StyledTabs } from '../Profile/TopicOwnerProfile/View'
import CategoryTab from './CategoryTab'

const TabPane = Tabs.TabPane

export const TopicHomeTabs = StyledTabs.extend`
  .ant-tabs-nav .ant-tabs-tab:last-child {
    pointer-events: none;
    cursor: inherit;
  }
`
// lol wtf I can't believe I can actually do that

type Props = {
  category: string,
  defaultTab?: string,
  data: { searchArticles?: ?{ totalElements: number } },
}

type State = {
  activeKey: string,
}

class TopicHome extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      activeKey: typeof props.defaultTab === 'string' ? props.defaultTab : 'category',
    }
  }

  onChange = (activeKey: string) => {
    // Router.pushRoute(`${window.location.pathname}?tab=${activeKey}`)
    this.setState({ activeKey })
  }

  render() {
    const {
      category,
      data: { loading, searchArticles },
    } = this.props
    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <TopicHomeTabs onChange={this.onChange} activeKey={this.state.activeKey}>
        <TabPane
          tab={
            <div>
              {/* <Icon type='user' /> */}
              <span>{category}</span>
            </div>
          }
          key='category'
        >
          <CategoryTab category={category} />
        </TabPane>

        <span
          tab={`${typeof searchArticles === 'object' && searchArticles.totalElements} Total Articles`}
          key='total'
        />
      </TopicHomeTabs>
    )
  }
}

export default TopicHome
