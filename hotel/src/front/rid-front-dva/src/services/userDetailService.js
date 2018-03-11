import { request, post, get } from '../utils/request';

export function userDetail() {
    return get(`/detail`);
}