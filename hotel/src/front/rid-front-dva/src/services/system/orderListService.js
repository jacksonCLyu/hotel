import { post, get, put, dele } from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

export function getListOrderInfo() {
    return get(`/order/getListOrderInfo`);
}
export function del({ id }) {
    return dele(`/order/deleteOrderInfo/`+id);
}

export function getMyOrderInfo({ id }) {
    return get(`/order/getMyOrderInfo/`+id);
}

export function pay({ id,userId,roomNumber }) {
    return put(`/order/pay/`+id,{
        userId,roomNumber
    });
}