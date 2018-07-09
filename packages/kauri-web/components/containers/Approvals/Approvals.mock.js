const singleMockData = {
  variables: {
    size: 500,
    category: 'metamask',
  },
  loading: false,
  networkStatus: 7,
  searchArticles: {
    content: [
      {
        article_id: '72ed5f9d94e84c948562e5782c5c9951',
        user_id: '0x76880776e0d525ff4d167000cd3f735486c99aac',
        request_id: 'b2c69a8e0e3f49bf94a0943172dd48f0',
        date_created: '2018-01-18T14:54:47.834Z',
        date_updated: '2018-01-18T14:54:47.834Z',
        tip: 0,
        text:
          '{"entityMap":{},"blocks":[{"key":"foo","text":"BRAP BRAP BRAP","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
        status: 'PENDING',
        category: 'metamask',
        subject: 'SIXTEEN SHOTS',
        versions: [
          {
            comments: [
              {
                date_created: '2018-01-18T14:59:38.582Z',
                __typename: 'CommentDTO',
              },
              {
                date_created: '2018-01-18T15:02:00.518Z',
                __typename: 'CommentDTO',
              },
              {
                date_created: '2018-01-18T15:07:17.130Z',
                __typename: 'CommentDTO',
              },
            ],
            __typename: 'DocumentDTO',
          },
        ],
        __typename: 'ArticleDTO',
      },
    ],
    __typename: 'Page_ArticleDTO',
  },
}
const multipleMockData = {
  variables: {
    size: 500,
    category: 'metamask',
  },
  loading: false,
  networkStatus: 7,
  searchArticles: {
    content: [
      {
        article_id: '12313212',
        user_id: '0x76880776e0d525ff4d167000cd3f735486c99aac',
        request_id: 'b2c69a8e0e3f49bf94a0943172dd48f0',
        date_created: '2018-01-18T14:54:47.834Z',
        date_updated: '2018-01-18T14:54:47.834Z',
        tip: 0,
        text:
          '{"entityMap":{},"blocks":[{"key":"foo","text":"BRAP BRAP BRAP","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
        status: 'PENDING',
        category: 'metamask',
        subject: 'SIXTEEN SHOTS',
        versions: [
          {
            comments: [
              {
                date_created: '2018-01-18T14:59:38.582Z',
                __typename: 'CommentDTO',
              },
              {
                date_created: '2018-01-18T15:02:00.518Z',
                __typename: 'CommentDTO',
              },
              {
                date_created: '2018-01-18T15:07:17.130Z',
                __typename: 'CommentDTO',
              },
            ],
            __typename: 'DocumentDTO',
          },
        ],
        __typename: 'ArticleDTO',
      },
      {
        article_id: '1232123',
        user_id: '0x76880776e0d525ff4d167000cd3f735486c99aac',
        request_id: 'b2c69a8e0e3f49bf94a0943172dd48f0',
        date_created: '2018-01-18T14:54:47.834Z',
        date_updated: '2018-01-18T14:54:47.834Z',
        tip: 0,
        text:
          '{"entityMap":{},"blocks":[{"key":"foo","text":"BRAP BRAP BRAP","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
        status: 'PENDING',
        category: 'metamask',
        subject: 'SIXTEEN SHOTS',
        versions: [
          {
            comments: [
              {
                date_created: '2018-01-18T14:59:38.582Z',
                __typename: 'CommentDTO',
              },
              {
                date_created: '2018-01-18T15:02:00.518Z',
                __typename: 'CommentDTO',
              },
              {
                date_created: '2018-01-18T15:07:17.130Z',
                __typename: 'CommentDTO',
              },
            ],
            __typename: 'DocumentDTO',
          },
        ],
        __typename: 'ArticleDTO',
      },
      {
        article_id: '2131231212',
        user_id: '0x76880776e0d525ff4d167000cd3f735486c99aac',
        request_id: 'b2c69a8e0e3f49bf94a0943172dd48f0',
        date_created: '2018-01-18T14:54:47.834Z',
        date_updated: '2018-01-18T14:54:47.834Z',
        tip: 0,
        text:
          '{"entityMap":{},"blocks":[{"key":"foo","text":"BRAP BRAP BRAP","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
        status: 'PENDING',
        category: 'metamask',
        subject: 'SIXTEEN SHOTS',
        versions: [
          {
            comments: [
              {
                date_created: '2018-01-18T14:59:38.582Z',
                __typename: 'CommentDTO',
              },
              {
                date_created: '2018-01-18T15:02:00.518Z',
                __typename: 'CommentDTO',
              },
              {
                date_created: '2018-01-18T15:07:17.130Z',
                __typename: 'CommentDTO',
              },
            ],
            __typename: 'DocumentDTO',
          },
        ],
        __typename: 'ArticleDTO',
      },
    ],
    __typename: 'Page_ArticleDTO',
  },
}
export { singleMockData, multipleMockData }
