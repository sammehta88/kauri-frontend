const Cookies = require('js-cookie')
const SSParser = require('cookie')

export default class NextStorage {
  constructor (ctx) {
    this.cookies = {}
    this.ctx = ctx
    this.isServer = !!ctx.req

    if (ctx.req) {
      // server
      const cookies = ctx.req.headers.cookie
      this.cookies = cookies ? SSParser.parse(cookies) : {}
    } else {
      // browser
      this.cookies = Cookies.getJSON()
    }
    this.cookies = {}
  }

  getItem (key, cb) {
    const value = this.cookies[key]
    return new Promise((resolve, reject) => resolve(value))
  }

  setItem (key, value, cb) {
    if (this.isServer && this.ctx.res) {
      this.ctx.res.setHeader('Set-Cookie', [`${key}=${value}`])
    } else {
      Cookies.set(key, value)
    }
    return new Promise((resolve, reject) => resolve())
  }

  removeItem (key, cb) {
    if (this.isServer && this.ctx.res) {
      this.ctx.res.setHeader('Set-Cookie', [`${key}=null; expires=${new Date(0).toUTCString()}`])
    } else {
      Cookies.remove(key)
    }
    return new Promise((resolve, reject) => resolve())
  }

  getAllKeys (cb) {
    return new Promise((resolve, reject) => resolve(Object.keys(this.cookies)))
  }
}
