import { post, get, put, dele } from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

export function getListOrderInfo() {
    return get(`/order/getListOrderInfo`);
}
export function del({ id }) {
    return dele(`/order/deleteOrderInfo/`+id);
}