import moment from 'moment'
import CryptoJS from 'crypto-js'
import { request, errorToJSON } from 'utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const AccessTokenInfo = {
  ACCESS_TOKEN: '',
  EXPIRES_IN: 7200,
  LAST_TIME: moment(),
  get isExpired() {
    if (!this.ACCESS_TOKEN) return true
    if (moment().diff(this.LAST_TIME, 's') >= this.EXPIRES_IN) return true
    return false
  },
}
const JSApiTicketInfo = {
  TICKET: '',
  EXPIRES_IN: 7200,
  LAST_TIME: moment(),
  get isExpired() {
    if (!this.TICKET) return true
    if (moment().diff(this.LAST_TIME, 's') >= this.EXPIRES_IN) return true
    return false
  },
}

const APPID = 'wxc223684559f48cd3'
const APPSECRET = 'dfd66b6e3ba272274e38759d05cfa3f5'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { href } = req.body as Record<string, string>
      if (AccessTokenInfo.isExpired) {
        const response = await request.get(
          `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
        )
        if (response.data.errcode) {
          res.status(500).json({ data: response.data })
          return
        }
        AccessTokenInfo.LAST_TIME = moment()
        AccessTokenInfo.ACCESS_TOKEN = response.data.access_token
        AccessTokenInfo.EXPIRES_IN = response.data.expires_in
      }
      if (JSApiTicketInfo.isExpired) {
        const response = await request.get(
          `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${AccessTokenInfo.ACCESS_TOKEN}&type=jsapi`
        )
        if (response.data.errcode) {
          res.status(500).json({ data: response.data })
          return
        }
        JSApiTicketInfo.LAST_TIME = moment()
        JSApiTicketInfo.TICKET = response.data.ticket
        JSApiTicketInfo.EXPIRES_IN = response.data.expires_in
      }
      const nonceStr = '1024code'
      const jsapi_ticket = JSApiTicketInfo.TICKET
      const timestamp = moment().unix()
      const string1 = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${href}`
      const signature = CryptoJS.SHA1(string1).toString()

      res.status(200).json({
        appId: APPID,
        nonceStr,
        timestamp,
        signature,
        info: { access_token: AccessTokenInfo.ACCESS_TOKEN, jsapi_ticket, string1 },
      })
    } else {
      res.status(404).json({ msg: '没有该接口' })
    }
  } catch (error: any) {
    res.status(500).json({ data: errorToJSON(error) })
  }
}
