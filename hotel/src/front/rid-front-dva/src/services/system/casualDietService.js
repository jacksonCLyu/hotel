import { post, get, put, dele } from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

export function getListCasualDiet() {
    return get(`/casualDiet/getListCasualDiet`);
}


export function insert({ name, price}) {
    return post(`/casualDiet/insertCasualDiet`,{
        name,price
    });
}

export function insertOtherOrders({ id, userId}) {
    return post(`/otherOrders/insertOtherOrders`,{
        casualDietId:id,userId
    });
}
