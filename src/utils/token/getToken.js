/*****************

    取得 token

*****************/

import axios from "axios";

// 登入
export async function login() {
    const data = {
      "username": import.meta.env.VITE_APP_ACCOUNT,
      "password": import.meta.env.VITE_APP_PW,
    }
    const conf = {
      method: 'POST',
      url: `${import.meta.env.VITE_APP_URL}v2/admin/signin`,
      data: data,
    }
    await axios(conf).then((res) => {
      console.log(res);

      // 取出 token 和 expired
      const { token, expired } = res.data;

      // 存放到 cookie，expired 轉成時間格式
      document.cookie = `token=${token};expires=${new Date(expired)}`;

    }).catch((err) => {
      console.log(err.response);
    })
  }

// 取出 token
export function getTokenFromCookie() {
    const tokenCookie = document.cookie.split(';').map(cookie => cookie.trim()).find(cookie => cookie.startsWith('token='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;
    return token;
}