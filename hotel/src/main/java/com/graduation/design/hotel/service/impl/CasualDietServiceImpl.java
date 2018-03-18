package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.ICasualDietDao;
import com.graduation.design.hotel.model.CasualDietVO;
import com.graduation.design.hotel.service.ICasualDietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author QiShuo
 */
@Service
public class CasualDietServiceImpl implements ICasualDietService{
    @Autowired
    private ICasualDietDao casualDietDao;

    @Override
    public List<CasualDietVO> getListCasualDiet() {
        return casualDietDao.getListCasualDiet();
    }

    @Override
    public CasualDietVO getCasualDiet(Integer id) {
        return casualDietDao.getCasualDiet(id);
    }

    @Override
    public Integer insertCasualDiet(CasualDietVO vo) {
        return casualDietDao.insertCasualDiet(vo);
    }

    @Override
    public Integer updateCasualDiet(CasualDietVO vo) {
        return casualDietDao.updateCasualDiet(vo);
    }

    @Override
    public Integer deleteCasualDiet(Integer id) {
        return casualDietDao.deleteCasualDiet(id);
    }
}
