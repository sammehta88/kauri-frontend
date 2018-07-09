// @flow

export const metamask = {
  primaryColor: '#F7861C',
  borderColor: '#F7861C',
  homepageURL: 'https://metamask.io',
}

// export const ethereum = {
//   primaryColor: '#132026',
//   borderColor: '#132026',
//   homepageURL: 'https://www.ethereum.org',
// }

export const uport = {
  primaryColor: '#5147c3',
  borderColor: '#5147c3',
  homepageURL: 'https://uport.me',
}

export const kauri = {
  primaryColor: '#0ba986',
  borderColor: '#0ba986',
  homepageURL: 'https://www.kauri.io',
}

export const aragon = {
  primaryColor: '#1D1F1F',
  borderColor: '#1D1F1F',
  homepageURL: 'https://aragon.one',
}

export const dharma = {
  primaryColor: '#0F2224',
  borderColor: '#0F2224',
  homepageURL: 'https://dharma.io',
}

export const ens = {
  primaryColor: '#55A558',
  borderColor: '#55A558',
  homepageURL: 'https://ens.domains/',
}

export const makerdao = {
  primaryColor: '#5A6876',
  borderColor: '#5A6876',
  homepageURL: 'https://makerdao.com/',
}

export const remix = {
  primaryColor: '#b3b3b3',
  borderColor: '#b3b3b3',
  homepageURL: 'https://github.com/ethereum/remix',
}

export const toshi = {
  primaryColor: '#000000',
  borderColor: '#000000',
  homepageURL: 'https://www.toshi.org/',
}

export const zeppelin = {
  primaryColor: '#3566B2',
  borderColor: '#3566B2',
  homepageURL: 'https://zeppelinos.org/',
}

export const categories = Object.keys({
  kauri,
  metamask,
  // ethereum,
  uport,
  aragon,
  dharma,
  ens,
  makerdao,
  remix,
  toshi,
  zeppelin,
})

const themeConfig = {
  padding: 'calc((100vw - 1280px) / 2)',
  paddingTop: '2.5em',
  primaryColor: '#0BA986',
  secondaryColor: '#1E3D3B',
  primaryTextColor: '#1E2428',
  secondaryTextColor: '#283035',
  hoverTextColor: '#108E72',
  disabledTextColor: '#9B9B9B',
  tertiaryBackgroundColor: '#F7F7F7',
  disabledBackgroundColor: '#D6D6D6',
  contentBorder: '1px solid rgba(30, 36, 40, 0.19)',
  errorRedColor: '#C03030',
  metamask,
  // ethereum,
  uport,
  kauri,
  aragon,
  dharma,
  ens,
  makerdao,
  remix,
  toshi,
  zeppelin,
}

export default themeConfig
