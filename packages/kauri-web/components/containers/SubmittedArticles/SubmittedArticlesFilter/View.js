import React, { Component } from 'react'
import styled from 'styled-components'
import { Select } from 'antd'
const Option = Select.Option

const Label = styled.label`
  font-weight: 500;
  font-size: 12px;
`

class SubmittedArticlesFilter extends Component {
  handleSelect = value => console.log(value)

  render () {
    return (
      <div>
        <Label htmlFor='filter'>FILTER BY: </Label>
        <Select onSelect={this.handleSelect} id='filter' defaultValue='latest'>
          <Option value='latest'>
            <strong>Latest</strong>
          </Option>
        </Select>
      </div>
    )
  }
}

export default SubmittedArticlesFilter
