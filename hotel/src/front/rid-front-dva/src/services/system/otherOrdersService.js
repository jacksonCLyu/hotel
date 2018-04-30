import { post, get, put, dele } from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

export function getListOtherOrders() {
    return get(`/otherOrders/getListOtherOrders`);
}
export function del({ id }) {
    return dele(`/otherOrders/deleteOtherOrders/`+id);
}

export function getMyOtherOrders({ userId }) {
    return get(`/otherOrders/getMyOtherOrders/`+userId);
}
