import React from 'react'
import { storiesOf } from '@storybook/react'
import { StyledSelect } from './View'
import { Select } from 'antd'

const Option = Select.Option

storiesOf('StyledSelect', module).add('Example', () => (
  <StyledSelect
    style={{ width: 155 }}
    showSearch
    optionFilterProp='children'
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    onChange={value => console.log(value)}
    id='filter'
    defaultValue={'all'}
  >
    <Option value='all'>ALL TOPICS</Option>
    <Option value='metamask'>METAMASK</Option>
    <Option value='ethereum'>ETHEREUm</Option>
  </StyledSelect>
))
