import axios from 'axios';

/**
 * 配置 request 请求时的默认参数
 */
const request = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export default request;
