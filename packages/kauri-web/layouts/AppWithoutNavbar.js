import React from 'react'
import { Layout, Modal } from 'antd'
import { connect } from 'react-redux'
import styled from 'styled-components'
import NetworkBanner from '../components/containers/StyledFooter/NetworkBanner'

const { Content } = Layout
export const menuHeaderHeight = 76

const StyledContent = styled(Content)`
  padding-top: 0px;
  min-height: calc(100vh - ${menuHeaderHeight}px);
`

const mapStateToProps = (state, ownProps) => ({
  modalOpen: state.app.modalOpen,
  modalTitle: state.app.modalTitle,
  modalChildren: state.app.modalChildren,
  onOk: state.app.onOk,
  onCancel: state.app.onCancel,
  footer: state.app.footer,
})

export default connect(mapStateToProps)(
  ({ children, modalTitle, modalChildren, modalOpen, onOk, onCancel, footer, url, confirmationPage }) => (
    <Layout style={{ overflow: 'auto' }} className='layout'>
      <Modal title={modalTitle} visible={modalOpen} onOk={onOk} onCancel={onCancel} footer={footer}>
        {modalChildren}
      </Modal>
      <StyledContent>
        <NetworkBanner />
        {children}
      </StyledContent>
    </Layout>
  )
)
