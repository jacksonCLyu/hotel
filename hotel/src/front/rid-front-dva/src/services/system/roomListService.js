import { post, get, put, dele } from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

export function getListRoom() {
    return get(`/room/getListRoom`);
}
export function add({ id,roomNumber, price,standard }) {
    return post(`/room/insertRoom`, {
        roomNumber, price,standard
    });
}

export function exit({id,roomNumber, price,standard,flg}) {
    return put(`/room/updateRoom/`+id, {
        roomNumber, price,standard,flg
    });
}
export function del({ id }) {
    return dele(`/room/deleteRoom/`+id);
}

export function book({ roomNumber, price,userId,checkTime,leaveTime  }) {
    return post(`/booking/book`,{
        roomNumber, roomPrick:price,userId,checkTime,leaveTime
    });
}