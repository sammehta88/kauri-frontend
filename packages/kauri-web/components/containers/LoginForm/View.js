// @flow
import React from 'react'
import styled from 'styled-components'
import { Form, Input, Tabs } from 'antd'
import { Helmet } from 'react-helmet'
import { menuHeaderHeight } from '../Navbar/View'
import ActionButton from '../../common/ActionButton'

import type { RegisterActionPayload } from './Module'
import type { ShowNotificationPayload } from '../../../lib/Module'

const TabPane = Tabs.TabPane
const FormItem = Form.Item

const Container = styled.section`
  display: flex;
  min-height: calc(100vh - ${menuHeaderHeight}px);
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.primaryTextColor};
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
`

const StyledInput = styled(Input)`
  width: 100%;
  background: transparent;
  height: 39px;
  color: #fff;
  font-size: 12px !important;
  text-align: center !important;
  border: 1px solid #878787 !important;
  *,
  > * {
    text-align: center !important;
    font-size: 12px !important;
    color: #fff;
  }
  :focus,
  :hover {
    border: 2px solid ${props => props.theme.primaryColor} !important;
  }
`

const LoginTabs = styled(Tabs)`
  .ant-tabs-tab {
    margin-right: 0px;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;
    text-align: center;
    color: #fff !important;
    width: 50%;
    text-align: center;
    :hover {
      color: ${props => props.theme.primaryColor} !important;
    }
  }

  .ant-tabs-nav.ant-tabs-nav-animated {
    display: flex;
    width: 100% !important;
  }

  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    background: ${props => props.theme.primaryColor} !important;
  }
`

const InstallMetaMaskCTA = styled.span`
  color: #fff;
`

const Web3Unavailable = () => (
  <Container>
    <InstallMetaMaskCTA>
      {`To interact with Kauri, `}
      <a target='_blank' href='https://metamask.io/'>
        Get MetaMask
      </a>
    </InstallMetaMaskCTA>
  </Container>
)

class LoginForm extends React.Component<{
  handleSubmit: (e: any) => void,
  getFieldDecorator: any,
  type?: string,
}> {
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.props.handleSubmit(e)
    }
  }

  render () {
    const { handleSubmit, getFieldDecorator } = this.props

    return (
      <StyledForm onSubmit={handleSubmit}>
        <FormItem for='email' style={{ width: '100%' }}>
          {getFieldDecorator('email', {
            validateTrigger: 'onBlur',
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<StyledInput placeholder='EMAIL' data-test-id='email' />)}
        </FormItem>
        <FormItem for='username' style={{ width: '100%' }}>
          {getFieldDecorator('username', {
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
          })(<StyledInput onKeyPress={this.handleKeyPress} placeholder='USERNAME' data-test-id='username' />)}
        </FormItem>
        <FormItem>
          <ActionButton
            alone
            dataTestId='login-submit'
            type='primary'
            htmlType='submit'
            action={handleSubmit}
            label={this.props.type === 'register' ? 'REGISTER' : 'LOGIN'}
          />
        </FormItem>
      </StyledForm>
    )
  }
}

type Props = {
  form: any,
  registerAction: (payload: RegisterActionPayload, callback: any) => void,
  showNotificationAction: ShowNotificationPayload => void,
}

class LoginFormContainer extends React.Component<Props> {
  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  getNetwork = async () =>
    new Promise((resolve, reject) => {
      window.web3.version.getNetwork((err, netId) => {
        if (err) {
          reject(err)
        }

        const networkId = netId
        let networkName

        switch (netId) {
          case '1':
            networkName = 'Mainnet'
            break
          case '2':
            networkName = 'Morden'
            break
          case '3':
            networkName = 'Ropsten'
            break
          case '4':
            networkName = 'Rinkeby'
            break
          case '42':
            networkName = 'Kovan'
            break
          case '224895':
            networkName = 'Kauri Dev'
            break
          default:
            networkName = 'Unknown'
        }

        resolve({ networkId: Number(networkId), networkName })
      })
    })

  handleSubmit = (type: 'login' | 'register') => (e: any) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (formErr, values: RegisterActionPayload) => {
      const { networkName } = await this.getNetwork()
      if (networkName !== 'Kauri Dev' && networkName !== 'Rinkeby') {
        return this.props.showNotificationAction({
          notificationType: 'error',
          message: 'Network error!',
          description: 'Please switch to the correct Ethereum network!',
        })
      }
      if (!formErr) {
        console.log('Received values of form: ', values)
        return this.props.registerAction(
          { ...values, userId: window && window.web3.eth.accounts && window.web3.eth.accounts[0], type },
          this.props.form.resetFields
        )
      }
      return console.error(formErr)
    })
  }

  render () {
    if (global.window && !global.window.web3) {
      return <Web3Unavailable />
    }
    return (
      <Container>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <LoginTabs style={{ width: 400 }} size='large' defaultActiveKey='1'>
          <TabPane tab='LOGIN' key='1'>
            <LoginForm {...this.props.form} handleSubmit={this.handleSubmit('login')} />
          </TabPane>
          <TabPane tab='REGISTER' key='2'>
            <LoginForm {...this.props.form} type='register' handleSubmit={this.handleSubmit('register')} />
          </TabPane>
        </LoginTabs>
      </Container>
    )
  }
}

export default Form.create()(LoginFormContainer)
