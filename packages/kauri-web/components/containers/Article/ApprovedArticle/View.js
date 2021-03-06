// @flow
import React from 'react'
import { Helmet } from 'react-helmet'
import slugify from 'slugify'
import rake from 'rake-js'
import R from 'ramda'
import styled from 'styled-components'
import Actions from './ApprovedArticleActions'
import Content from './ApprovedArticleContent'
import Header from './ApprovedArticleHeader'
import Banner from './ApprovedArticleBanner'
import Footer from './ApprovedArticleFooter'
import { hljs } from '../../../../lib/hljs'
import ScrollToTopOnMount from '../../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs'
import ScrollToTopButton from '../../../../../kauri-components/components/ScrollToTopButton/ScrollToTopButton'

import type { TipArticlePayload } from '../Module'

const ArticleContent = styled.section`
background: white;
height: 100%;
`;

type Props =
  | {
    routeChangeAction: string => void,
    tipArticleAction: TipArticlePayload => void,
    ethUsdPrice: number,
    address?: string,
    data: { getArticle?: ArticleDTO },
  }
  | any

type State = {
  showBanner: boolean,
}

class ApprovedArticle extends React.Component<Props, State> {
  static Header = Header
  static Actions = Actions
  static Content = Content
  static Banner = Banner
  static Footer = Footer

  state = {
    showBanner: false,
  }

  componentDidUpdate () {
    R.map((block) => hljs.highlightBlock(block))(document.querySelectorAll('pre code'))
  }

  componentDidMount () {
    R.map((block) => hljs.highlightBlock(block))(document.querySelectorAll('pre code'))
  }

  toggleBanner = (status?: boolean) =>
    typeof status === 'boolean'
      ? this.setState({ showBanner: status })
      : this.setState({ showBanner: !this.state.showBanner })

  render () {
    const props = this.props
    if (!props.data.getArticle) return
    const { subject, article_id, text } = props.data.getArticle
    const articleContent = JSON.parse(text).markdown ? JSON.parse(text).markdown : text
    const articleKeywords = rake(articleContent, {
      language: 'english',
      delimiters: ['#', '##', '###', '####', '\n', '\n\n'],
    })
    const hostName = `https://${props.hostName}`

    return (
      <ArticleContent>
        <Helmet>
          <title>{subject} - Kauri</title>
          <meta name='keywords' content={articleKeywords.map(i => i)} />
          <link rel='canonical' href={`https://${hostName}/article/${article_id}/${slugify(subject, { lower: true })}`} />
        </Helmet>
        <ScrollToTopOnMount />
        <ScrollToTopButton />
        <ApprovedArticle.Actions
          routeChangeAction={props.routeChangeAction}
          tipArticleAction={props.tipArticleAction}
          toggleBanner={this.toggleBanner}
          ethUsdPrice={props.ethUsdPrice}
          {...props.data.getArticle}
        />
        <ApprovedArticle.Banner
          type='article'
          showBanner={this.state.showBanner}
          ethUsdPrice={props.ethUsdPrice}
          tipArticleAction={props.tipArticleAction}
          toggleBanner={this.toggleBanner}
          request_id={props.data.getArticle && props.data.getArticle.request_id}
          article_id={props.data.getArticle && props.data.getArticle.article_id}
          article_version={props.data.getArticle && props.data.getArticle.article_version}
          user_id={props.data.getArticle && props.data.getArticle.user_id}
          hostName={hostName}
        />
        <ApprovedArticle.Header {...props.data.getArticle} />
        <ApprovedArticle.Content
          text={props.data.getArticle && props.data.getArticle.text}
          subject={props.data.getArticle && props.data.getArticle.subject}
          article_id={props.data.getArticle && props.data.getArticle.article_id}
          article_version={props.data.getArticle && props.data.getArticle.article_version}
          username={props.data.getArticle && props.data.getArticle.user && props.data.getArticle.user.username}
          userId={props.data.getArticle && props.data.getArticle.user_id}
          routeChangeAction={props.routeChangeAction}
          address={props.address}
          hostName={hostName}
        />
        <ApprovedArticle.Footer
          metadata={props.data.getArticle && props.data.getArticle.metadata}
          username={props.data.getArticle && props.data.getArticle.user && props.data.getArticle.user.username}
          date_updated={props.data.getArticle && props.data.getArticle && props.data.getArticle.date_updated}
          content_hash={props.data.getArticle && props.data.getArticle && props.data.getArticle.content_hash}
          hostName={hostName}
        />
      </ArticleContent>
    )
  }
}

export default ApprovedArticle
