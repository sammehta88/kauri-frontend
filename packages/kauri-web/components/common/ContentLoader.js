import React from 'react'
import ContentLoader from 'react-content-loader'
import theme from '../../lib/theme-config'

const width = 945
const height = 325

export default () => (
  <ContentLoader
    primaryColor={`#F5F9F8`}
    secondaryColor={`#F5F9F8`}
    uniquekey={`foobar-line-loader`}
    style={{ position: 'absolute', display: 'block', width, height }}
    width={width}
    height={height}
    animate={false}
  >
    <rect x='0' y={5} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={35} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={65} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={95} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={125} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={155} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={185} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={215} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={245} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={275} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={305} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={335} rx='2' ry='2' width={width} height='20' />
    <rect x='0' y={365} rx='2' ry='2' width={width} height='20' />
    {/* <rect x='0' y={395} rx='2' ry='2' width='600' height='20' />
    <rect x='0' y={425} rx='2' ry='2' width='600' height='20' />
    <rect x='0' y={455} rx='2' ry='2' width='600' height='20' />
    <rect x='0' y={485} rx='2' ry='2' width='600' height='20' />
    <rect x='0' y={515} rx='2' ry='2' width='600' height='20' />
    <rect x='0' y={545} rx='2' ry='2' width='600' height='20' />
    <rect x='0' y={575} rx='2' ry='2' width='600' height='20' />
    <rect x='0' y={605} rx='2' ry='2' width='600' height='20' /> */}
  </ContentLoader>
)
