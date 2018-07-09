import React from 'react'
import styled from 'styled-components'

const TabIcon = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  background-color: #ffffff;
`

const TabLabelContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  * {
    cursor: pointer;
  }
  > :first-child {
    margin-right: 13px;
  }
`

export default TabIcon
export { TabIcon, TabLabelContainer }
