import React, { Component } from 'react'
import { insertDataBlock } from 'megadraft'
import UppyIcon from './Icon'
import initUppy from '../../lib/init-uppy'

export default class BlockButton extends Component {
  componentDidMount () {}

  onClick = e => {
    e.preventDefault()
    const uppy = initUppy()

    uppy.run()
    uppy.on('upload-success', (file, { hash }) => {
      console.info(file)
      console.info(hash)
      this.props.onChange(
        insertDataBlock(this.props.editorState, {
          src: `https://${process.env.monolithExternalApi}:443/ipfs/${hash}`,
          type: 'image',
          display: 'medium',
        })
      )
      uppy.getPlugin('Dashboard').closeModal()
      uppy.close()
    })
    uppy.getPlugin('Dashboard').openModal()
  }

  render () {
    return (
      <button className={this.props.className} onClick={this.onClick}>
        <UppyIcon />
      </button>
    )
  }
}
