const hotJarTrackingCode = `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};' +
  'h._hjSettings={hjid:734967,hjsv:6};' +
  "a=o.getElementsByTagName('head')[0];" +
  "r=o.createElement('script');r.async=1;" +
  'r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;' +
  'a.appendChild(r);' +
  "})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`

const googleTagManagerCode = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-112179323-1');
`

const mixpanelToken = `7d83001be784f09b212b9b3274e41530`

const uppyConfig = {
  debug: true,
  autoProceed: true,
  restrictions: {
    maxFileSize: 1000000,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
  },
}

module.exports = {
  ethUsdPriceEndpoint: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
  subCategories: ['General', 'Tutorial', 'Walkthrough'],
  hotJarTrackingCode,
  googleTagManagerCode,
  mixpanelToken,
  uppyConfig,
}
