import { post, get, put, dele } from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

export function getListMyRoom({id}) {
    return get(`/myRoom/getListMyRoom/`+id);
}
export function unsubscribe({ id ,roomNumber}) {
    return put(`/myRoom/unsubscribe/`+id,{
        roomNumber
    });
}

