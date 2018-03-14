package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IEvaAndCompDao;
import com.graduation.design.hotel.model.EvaAndCompVO;
import com.graduation.design.hotel.service.IEvaAndCompService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EvaAndCompServiceImpl implements IEvaAndCompService {
    @Autowired
    private IEvaAndCompDao evaAndCompDao;
    @Override
    public List<EvaAndCompVO> getListEvaAndComp() {
        return evaAndCompDao.getListEvaAndComp();
    }

    @Override
    public List<EvaAndCompVO> getListEvaOrComp(Integer flg) {
        return evaAndCompDao.getListEvaOrComp(flg);
    }

    @Override
    public List<EvaAndCompVO> getMyEvaOrComp(Integer userId, Integer flg) {
        return evaAndCompDao.getMyEvaOrComp(userId,flg);
    }

    @Override
    public void inserEvaOrComp(EvaAndCompVO vo) {
        evaAndCompDao.inserEvaOrComp(vo);
    }

    @Override
    public Integer updateEvaOrComp(EvaAndCompVO vo) {
        return evaAndCompDao.updateEvaOrComp(vo);
    }

    @Override
    public Integer replyEvaOrComp(Integer adminId, Integer evaId, String content) {
        return evaAndCompDao.replyEvaOrComp(adminId,evaId,content);
    }

    @Override
    public void delteEvaOrComp(Integer evaId) {
        evaAndCompDao.delteEvaOrComp(evaId);
    }
}
