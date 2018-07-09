// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from '../../../../routes'
import { Subject } from '../../OpenRequests/OpenRequest'
import DatePosted from '../../../common/DatePosted'

type Props = {
  request_id: string,
  data: { getRequest: RequestDTO },
}

const OriginalRequest = styled.div`
  padding-left: 140px;
  > :first-child {
    margin-bottom: 9px;
  }
  > :last-child {
    margin-top: 14px;
  }
`

const OriginalRequestLabel = styled.h5`
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  line-height: 15px;
  color: ${props => props.theme.secondaryTextColor};
  text-transform: uppercase;
`

export const Details = styled.div`
  display: flex;
  margin-top: auto;
  > :not(:first-child) {
    margin-left: 30px;
  }
`

export default ({ request_id, data: { getRequest } }: Props) => (
  <OriginalRequest>
    <OriginalRequestLabel>Original Request</OriginalRequestLabel>
    <Link route={`/request/${getRequest && getRequest.request_id}`}>
      <Subject href={`/request/${request_id}`}>{getRequest && getRequest.subject}</Subject>
    </Link>
    <Details>
      <DatePosted>
        <span>POSTED</span>
        <strong>{moment(getRequest && getRequest.date_created).format('DD/MM/YYYY')}</strong>
      </DatePosted>
      <DatePosted>
        <span>EXPIRE{moment(getRequest && getRequest.dead_line).isBefore() ? 'D' : 'S'}</span>
        <strong>{`${moment(getRequest && getRequest.dead_line).fromNow()} ${moment(
          getRequest && getRequest.dead_line
        ).format('(DD MMM YYYY)')}`}</strong>
      </DatePosted>
    </Details>
  </OriginalRequest>
)
