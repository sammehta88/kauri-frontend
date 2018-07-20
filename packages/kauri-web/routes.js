const Link = require('./components/containers/Link').default

const nextRoutes = require('next-routes')

const Router = nextRoutes().Router

const routes = (module.exports = nextRoutes({
  Link,
  Router,
}))

routes
  .add('submit-article', '/request/:request_id/submit-article')
  .add('suggest-edits', '/article/:article_id/suggest-edits')
  .add('view-article', '/article/:article_id')
  .add('view-article-version', '/article/:article_id/article_version/:article_version')
  .add('update-article', '/article/:article_id/update-article')
  .add('request', '/request/:request_id')
  .add('update-request', '/request/:request_id/update-request')
  .add('request-created', '/request/:request_id/request-created')
  .add('article-submitted', '/article/:article_id/article-submitted')
  .add('article-approved', '/article/:article_id/article-approved')
  .add('article-rejected', '/article/:article_id/article-rejected')
  .add('article-published', '/article/:article_id/article-published')
  .add('article-finalised', '/article/:article_id/article-finalised')
  .add('reject-article', '/article/:article_id/reject-article')
  .add('topic-home', '/topic/:category')
