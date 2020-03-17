//用来封装请求注册接口的文件
import axios from 'axios'
export function apiGetCode({code, phone}) {
   return axios({
            url: process.env.VUE_APP_ONLINEURL + `/sendsms`,
            method: "post",
            // withCredentials: true, // 跨域请求时 需要设置
            data: {
                code: code,
                phone: phone
            },
            withCredentials: true, // 跨域请求时 需要设置
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
}