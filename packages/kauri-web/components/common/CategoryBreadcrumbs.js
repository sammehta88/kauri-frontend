import React from 'react'
import styled from 'styled-components'
import { Link } from '../../routes'

const CategoryBreadcrumbs = styled.div`
  line-height: 16px;
`

const CategoryBreadcrumb = styled.a`
  color: ${props => props.theme.primaryColor};
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  text-transform: uppercase;
`

const BreadcrumbSeparator = styled.span`
  height: 12px;
  width: 12px;
  margin: 0 3px;
`

export default ({ category, sub_category }) => (
  <CategoryBreadcrumbs>
    <Link route={`/topic/${category}`}>
      <CategoryBreadcrumb href={`/topic/${category}`}>{category}</CategoryBreadcrumb>
    </Link>
    <BreadcrumbSeparator>></BreadcrumbSeparator>
    <Link route={`/topic/${category}?subcategory=${sub_category || category}`}>
      <CategoryBreadcrumb href={`/topic/${category}?subcategory=${sub_category || category}`}>
        {sub_category || category}
      </CategoryBreadcrumb>
    </Link>
  </CategoryBreadcrumbs>
)
