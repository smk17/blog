import moment from 'moment';
import { request } from 'utils';
import { descriptor, getTokenById, getUserByAdmin, IToken, Token } from 'collections';

async function requestAccessToken() {
  const response = await request.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${process.env.APPID}&secret=${process.env.APPSECRET}`,
  );

  if (response.errcode) {
    throw response;
  }

  return {
    last_time: moment().toDate(),
    token: response.access_token,
    expires_in: response.expires_in,
  } as IToken;
}

export const getAccessToken = descriptor(async function () {
  const user = await getUserByAdmin();
  if (!user.wxAccessToken) {
    const opts = await requestAccessToken();
    const doc = new Token(opts);
    await doc.save();
    user.wxAccessToken = doc._id;
    await user.save();
    return opts.token;
  }
  const doc = await getTokenById(user.wxAccessToken.toString());
  const { token, last_time, expires_in } = doc;
  if (moment().diff(moment(last_time), 's') >= expires_in) {
    const opts = await requestAccessToken();
    doc.last_time = opts.last_time;
    doc.token = opts.token;
    doc.expires_in = opts.expires_in;
    await doc.save();
    return doc.token;
  }
  return token;
});
