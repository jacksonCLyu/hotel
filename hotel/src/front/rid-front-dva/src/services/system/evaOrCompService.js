import { post, get, put, dele } from '../../utils/request';
import { PAGE_SIZE } from '../../constants';

export function getListEvaOrComp({flg}) {
    return get(`/evaOrComp/getListEvaOrComp`,{
        flg
    });
}
export function inserEvaOrComp({ userId,content,score,flg,number}) {
    return post(`/evaOrComp/inserEvaOrComp`,{
        userId,content,score,flg,number
    });
}
export function updateEvaOrComp({ id,content,score,number}) {
    return put(`/evaOrComp/updateEvaOrComp/`+id,{
        content,score,number
    });
}
export function delteEvaOrComp({ id}) {
    return dele(`/evaOrComp/delteEvaOrComp/`+id);
}

export function getMyEvaOrComp({ userId,flg}) {
    return get(`/evaOrComp/getMyEvaOrComp`,{
        userId,flg
    });
}
export function replyEvaOrComp({ adminId,evaId,reply}) {
    return put(`/evaOrComp/replyEvaOrComp/`+evaId,{
        adminId,content:reply
    });
}