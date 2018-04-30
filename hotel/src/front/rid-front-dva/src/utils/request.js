import fetch from 'dva/fetch';
import Qs from 'qs';
import { URL, PAGE_SIZE } from '../constants';
import { Modal } from 'antd';

const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

async function dele(url) {
  return request(REQUEST_METHOD.DELETE, url);
}

async function put(url, param, putJson = true) {
  return request(REQUEST_METHOD.PUT, url, param, putJson);
}

async function post(url, param, postJson = true) {
  return request(REQUEST_METHOD.POST, url, param, postJson);
}
async function get(url, param) {
  return request(REQUEST_METHOD.GET, url + (param ? `?${Qs.stringify(param)}` : ''));
}
function onOk(){
  window.location.href = `${location.origin}`;
}
function onOkPath(){
  window.location.href = `${location.origin}`;
}
async function request(method, url, param, json = true) {
  const httpRequest = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': `${json ? 'application/json' : 'application/x-www-form-urlencoded'}; charset=utf-8`,
    },
  };
  if (param) {
    httpRequest.body = json ? JSON.stringify(param) : Qs.stringify(param);
  }
  const response = await fetch(URL + url, httpRequest);
  checkStatus(response);
  let repUrl = response.url;
  if (repUrl.indexOf("exportExcel") > 0 || repUrl.indexOf("exportCsv") > 0 || repUrl.indexOf("exportTableDataNew") > 0) {
    return await response.blob();
  } else {
    const data = await response.json();
    if (data.code == 401) {
      Modal.error({
        content: "没有权限,请重新登录!",
        onOk:onOk
      });
      return;
    }
    if (data.code == 400502) {
      Modal.error({
        content: "用户末授权访问此资源",
        onOk:onOkPath
      });
      return;
    }
    if (data.code == 400505) {
      Modal.error({
        content: "资源已删除",
        onOk:onOkPath
      });
      return;
    }
    if (data.code == 20001) {
      window.location.href = `${location.origin}/login.html`;
      return;
    }
    if (data.code != 0) {
      Modal.error({
        content: data.error,
      });
      return false;
    }
    return data;
  }
}
export {
  post,
  get,
  put,
  dele,
};
