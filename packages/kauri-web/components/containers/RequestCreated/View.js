// @flow
import React from 'react'
import styled from 'styled-components'
import { ActionButtons, ActionButton } from '../../common/ActionButton'
import { ConfirmationLogoBadge } from '../../common/ActionBadge'
import { menuHeaderHeight } from '../Navbar/View'
import moment from 'moment'

type Props = {
  data?: { getRequest?: RequestDTO },
  routeChangeAction: string => void,
}

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${menuHeaderHeight}px);
  background-color: ${props => props.theme.primaryTextColor};
  > :first-child {
    margin-bottom: 30px;
  }
`

export const ConfirmationSubject = styled.h2`
  color: #ffffff;
  font-size: 26px;
  font-weight: normal;
`

export const ConfirmationDeadline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  span {
    font-size: 16px;
  }
  > :first-child {
    margin-bottom: 8px;
  }
  margin-bottom: 39px;
`

class RequestCreated extends React.Component<Props> {
  render () {
    const { data, routeChangeAction } = this.props
    return (
      <Container>
        <ConfirmationLogoBadge
          chosenCategory={data && data.getRequest && data.getRequest.category}
          confirmationMessage={'Request Posted'}
        />
        <ConfirmationSubject>{data && data.getRequest && data.getRequest.subject}</ConfirmationSubject>
        <ConfirmationDeadline>
          <span>This request expires {moment(data && data.getRequest && data.getRequest.dead_line).fromNow()}.</span>
          <span>{moment(data && data.getRequest && data.getRequest.dead_line).format('DD/MM/YYYY')}</span>
        </ConfirmationDeadline>
        <ActionButtons>
          <ActionButton
            action={() => routeChangeAction(`/request/${data.getRequest.request_id}`)}
            height={40}
            width={183}
            label={'View Request'}
            type='primary'
          />
          <ActionButton
            action={() => routeChangeAction(`/profile?tab=my requests`)}
            height={40}
            width={183}
            label={'Profile - My Requests'}
            type='alt'
          />
        </ActionButtons>
      </Container>
    )
  }
}

export default RequestCreated
