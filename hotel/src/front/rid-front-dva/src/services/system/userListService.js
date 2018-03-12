import { post, get, put, dele } from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

export function getListUser() {
    return get(`/user/getListUser`);
}
export function add({ id, userAccount, userPassword, userName, userId, userAge, userPhone }) {
    return post(`/user/insertUser`, {
        id, userAccount, userPassword, userName, userId, userAge, userPhone, flg: 0
    });
}

export function edit({ id, userPassword, userName, userId, userAge, userPhone }) {
    return put(`/user/updateUser/`+id, {
         userPassword, userName, userId, userAge, userPhone, flg: 0
    });
}
export function getAdminList() {
    return get(`/user/getAdminList`);
}
export function addAdmin({ id, userAccount, userPassword, userName, userPhone }) {
    return post(`/user/insertUser`, {
        id, userAccount, userPassword, userName, userPhone, flg: 1
    });
}
export function editAdmin({ id, userAccount, userPassword, userName, userPhone }) {
    return put(`/user/updateUser/`+id, {
        id, userAccount, userPassword, userName, userPhone, flg: 1
    });
}
export function del({ id }) {
    return dele(`/user/deleteUser/`+id);
}