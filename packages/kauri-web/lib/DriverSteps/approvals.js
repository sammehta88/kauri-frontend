// @flow
import type { DriverStep } from '../LocalStorageModule'

const approvalDriverSteps: Array<DriverStep> = [
  {
    element: '#with-request',
    popover: {
      title: ' ',
      description: 'Users submited articles to a request',
      position: 'bottom',
      closeBtnText: 'Close',
      nextBtnText: 'Next',
      prevBtnText: 'Previous',
    },
  },
  {
    element: '#without-request',
    popover: {
      title: ' ',
      description: 'Users submited articles without a request',
      position: 'bottom',
      nextBtnText: 'Next',
      closeBtnText: 'Close',
      prevBtnText: 'Previous',
    },
  },
  {
    element: '#publish',
    popover: {
      title: ' ',
      description: 'Articles that need final approval',
      position: 'bottom',
      nextBtnText: 'Next',
      closeBtnText: 'Close',
      prevBtnText: 'Previous',
    },
  },
  {
    element: '#approval-history',
    popover: {
      title: ' ',
      description: 'History of previously approved articles',
      position: 'bottom',
      nextBtnText: 'Next',
      closeBtnText: 'Close',
      prevBtnText: 'Previous',
    },
  },
]

export default approvalDriverSteps
