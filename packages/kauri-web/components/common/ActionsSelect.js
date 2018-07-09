import React from 'react'
import styled from 'styled-components'
import { Select } from 'antd'

const ActionsSelect = styled(Select)`
  background: transparent;
  border: none;
  .ant-select-arrow {
    color: ${props => props.theme.primaryColor};
  }
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
    font-weight: 700;
    font-size: 12px;
    background-color: transparent;
    color: #fff;
    border: 1px solid ${props => (props.profile ? props.theme.primaryColor : props.theme.hoverTextColor)};
    border-radius: 4px;
  }
  .ant-select-selection-selected-value {
    color: ${props => props.theme.primaryTextColor};
    background-color: transparent;
  }
  .ant-select-dropdown-menu-item:hover {
    color: #fff;
    > * {
      color: #fff;
    }
  }
`

export default ActionsSelect
export { ActionsSelect }
