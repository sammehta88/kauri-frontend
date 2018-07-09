// @flow
import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import moment from 'moment'
import DatePosted from '../../../common/DatePosted'

type Props = {
  username?: ?string,
  date_updated?: string,
  type?: 'in review article' | 'approved article',
  metadata?: ?ArticleMetadataDTO,
  content_hash?: ?string,
}

const ArticleFooter = styled.section`
  padding: 0 ${props => props.theme.padding};
  margin-bottom: 30px;
`

const Username = styled.strong`
  color: ${props => props.theme.primaryColor};
`

const PullRight = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 11px;
`

const Details = styled.div`
  display: flex;
  flex-direction: row;
`

const Middle = styled.div`
  margin-left: auto;
`

export default ({ username, date_updated, type, metadata, content_hash }: Props) => (
  <ArticleFooter>
    <Divider />
    <Details>
      <DatePosted>
        <span>Written by</span>
        <Username>{username || 'Unknown writer'}</Username>
      </DatePosted>
      {
        <Middle>
          <DatePosted>
            {/* (Content)[a href='ipfs content hash'] is (CC-BY-SA 4.0)[a href='actual detail of the license link'] Licensed */}
            <a href={`https://${process.env.monolithExternalApi}:443/ipfs/${content_hash}`}>Content</a>
            <span> is</span>
            <a
              href={(metadata && metadata.LICENSE_URL) || 'https://creativecommons.org/licenses/by-sa/4.0/'}
            >{`${(metadata && metadata.LICENSE) || 'CC-BY-SA 4.0'} licensed`}</a>
          </DatePosted>
        </Middle>
      }
      <PullRight>
        <DatePosted>
          <span>POSTED</span>
          <strong>{moment(date_updated).format('DD/MM/YYYY')}</strong>
        </DatePosted>
      </PullRight>
    </Details>
  </ArticleFooter>
)
