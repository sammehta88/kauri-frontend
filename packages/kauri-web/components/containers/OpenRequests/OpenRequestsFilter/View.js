// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import moment from 'moment'
import { Select } from 'antd'
import { categories } from '../../../../lib/theme-config'

const Option = Select.Option

const greenArrowCss = css`
  .ant-select-arrow {
    color: ${props => props.theme.primaryColor};
  }
`

export const StyledSelect = styled(Select)`
  background: transparent;
  border: none;
  *,
  .ant-select-selection,
  > * {
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    border: none;
    background: transparent;
  }
  .ant-select-selection--multiple .ant-select-selection__choice {
    cursor: pointer;
    color: ${props => (props.topicHomepage ? props.theme.primaryTextColor : '#fff')};
    background-color: transparent;
    border: 1px solid ${props => (props.profile ? props.theme.primaryColor : props.theme.hoverTextColor)};
    border-radius: 4px;
  }
  .ant-select-selection-selected-value {
    color: ${props => (props.topicHomepage ? props.theme.primaryTextColor : '#fff')};
  }
  li,
  .ant-select-dropdown-menu-item-active {
    background-color: #fafafa !important;
  }
  li:hover,
  .ant-select-dropdown-menu-item-selected,
  .ant-select-dropdown-menu-item-selected:hover {
    background-color: #fafafa !important;
  }
  ${props => props.topicHomepage && greenArrowCss};
`

type Topic = string

const TopicSelect = ({
  handleTopicSelect,
  profile,
  categoryQuery,
}: {
  handleTopicSelect: *,
  profile: *,
  categoryQuery: *,
}) => (
  <StyledSelect
    style={{ width: 155 }}
    profile={profile}
    showSearch
    optionFilterProp='children'
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    onChange={handleTopicSelect}
    id='filter'
    defaultValue={categoryQuery || 'all'}
  >
    <Option value='all'>ALL TOPICS</Option>
    {categories.map(category => (
      <Option key={category} value={category && category.toLowerCase()}>
        {category && category.toUpperCase()}
      </Option>
    ))}
  </StyledSelect>
)

type Status = 'opened' | 'closed' | 'cancelled' | 'personal' | 'expired'
const statuses: Array<Status> = ['opened', 'closed', 'expired', 'personal']

const StatusSelect = ({ handleStatusSelect, profile }: { handleStatusSelect: *, profile: * }) => (
  <StyledSelect
    dropdownMatchSelectWidth
    profile={profile}
    showSearch
    optionFilterProp='children'
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    onChange={handleStatusSelect}
    id='filter'
    defaultValue={profile ? 'personal' : 'opened'}
  >
    {statuses
      .filter(status => {
        if (profile) {
          if (status === 'personal') {
            return status
          }
        } else {
          if (status !== 'personal') {
            return status
          }
        }
      })
      .map(status => (
        <Option key={status} value={status.toLowerCase()}>
          {(() => {
            if (status === 'opened') {
              return 'OPEN REQUESTS'
            } else if (status === 'closed') {
              return 'COMPLETED REQUESTS'
            } else if (status === 'expired') {
              return 'EXPIRED REQUESTS'
            } else if (status === 'personal') {
              return 'MY REQUESTS'
            }
          })()}
        </Option>
      ))}
  </StyledSelect>
)

export type Sort = 'date_created' | 'total_bounty' | 'text_ct'
const sorts: Array<Sort> = ['date_created', 'total_bounty', 'text_ct']

export const SortSelect = ({
  handleSortSelect,
  profile,
  topicHomepage,
}: {
  handleSortSelect: *,
  profile?: *,
  topicHomepage?: *,
}) => (
  <StyledSelect
    style={{ width: 155 }}
    profile={profile}
    topicHomepage={topicHomepage}
    showSearch
    optionFilterProp='children'
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    onSelect={handleSortSelect}
    id='filter'
    defaultValue='date_created'
  >
    {sorts.map(sort => (
      <Option key={sort} value={sort.toLowerCase()}>
        {(() => {
          if (sort === 'date_created') {
            return 'RECENT'
          } else if (sort === 'total_bounty') {
            return 'HIGHEST BOUNTY'
          } else if (sort === 'text_ct') {
            return 'MAINNET BOUNTY'
          }
        })()}
      </Option>
    ))}
  </StyledSelect>
)

const OpenRequestsFilterSection = styled.section`
  display: flex;
  height: 60px;
  align-items: center;
  padding: 0 ${props => props.theme.padding};
  background-color: ${props => (props.profile ? props.theme.hoverTextColor : props.theme.primaryColor)};
`

export const FilterLabel = styled.label`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  margin-right: 13px;
`

const TotalRequests = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  margin-left: auto;
  margin-right: 12px;
`

type Filter = {
  category_in?: Array<Topic>,
  status_in?: Array<Status>,
  dead_line_lt?: number,
  sort?: Sort,
}

type Result = {
  data: {
    searchRequests: {
      content: Array<?RequestDTO>,
    },
  },
}

type State = {
  filter: ?Filter,
  sort: ?Sort,
}

type Props = {
  refetch: ({ filter: ?Filter, sort: ?Sort }) => Promise<Result>,
  userId?: ?string,
  profile?: boolean,
  categoryQuery?: string,
  count?: number,
}

class OpenRequestsFilter extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      filter: {
        user_id_eq: typeof props.profile === 'boolean' ? props.userId : null,
        // $FlowFixMe
        status_in: typeof props.profile === 'boolean' ? null : ['OPENED'],
      },
      sort: null,
    }
  }

  async componentDidMount () {
    if (typeof this.props.categoryQuery === 'string') {
      setTimeout(
        () =>
          this.props.refetch({
            filter: { ...this.state.filter, category_in: [this.props.categoryQuery] },
            sort: this.state.sort,
          }),
        600
      )
    }
  }

  handleSearch = async (filter: Filter): Promise<void> => {
    let filterInput = this.state.filter
    let sort
    const filterType = Object.keys(filter)[0]

    if (filterType === 'category_in' && Array.isArray(filter.category_in)) {
      const allTopics = filter.category_in.find(topic => topic === 'all')
      let category_in = filter.category_in && filter.category_in.map(category => category.toUpperCase())
      if (allTopics) {
        category_in = categories
      }
      filterInput = { ...filterInput, category_in }
    } else if (filterType === 'status_in' && Array.isArray(filter.status_in)) {
      let status_in = filter.status_in && filter.status_in.map(status => status.toUpperCase())
      filterInput = { ...filterInput, status_in }
      const personalIndex = filterInput.status_in.findIndex(status => status === 'PERSONAL')
      if (personalIndex >= 0) {
        status_in.splice(personalIndex, 1)
        filterInput = { ...filterInput, status_in, user_id_eq: this.props.userId }
      } else {
        filterInput = { ...filterInput, status_in, user_id_eq: null }
      }
    }

    sort = filter.sort || this.state.sort
    if (filter.sort === 'text_ct') {
      filterInput = { ...filterInput, full_text: 'https://beta.bounties.network/bounty/' }
      sort = this.state.sort
    } else {
      filterInput = { ...filterInput, full_text: null }
    }

    await this.setState({ filter: filterInput, sort })
    console.log(this.state)
    await this.props.refetch({ filter: this.state.filter, sort: this.state.sort })
  }

  handleTopicSelect = async (topic: Topic): Promise<void> => this.handleSearch({ category_in: [topic] })
  handleStatusSelect = async (status: Status): Promise<void> => this.handleSearch({ status_in: [status] })
  handleSortSelect = async (sort: Sort): Promise<void> => this.handleSearch({ sort })

  render () {
    return (
      <OpenRequestsFilterSection profile={this.props.profile}>
        <FilterLabel htmlFor='filter'>FILTER BY </FilterLabel>
        <TopicSelect
          categoryQuery={this.props.categoryQuery}
          profile={this.props.profile}
          handleTopicSelect={this.handleTopicSelect}
        />
        <StatusSelect profile={this.props.profile} handleStatusSelect={this.handleStatusSelect} />
        <SortSelect profile={this.props.profile} handleSortSelect={this.handleSortSelect} />
        <TotalRequests>{this.props.count} REQUESTS</TotalRequests>
      </OpenRequestsFilterSection>
    )
  }
}

export default OpenRequestsFilter
