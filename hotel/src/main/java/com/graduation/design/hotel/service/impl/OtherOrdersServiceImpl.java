package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IOtherOrdersDao;
import com.graduation.design.hotel.model.OtherOrdersVO;
import com.graduation.design.hotel.service.IOtherOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author QiShuo
 */
@Service
public class OtherOrdersServiceImpl implements IOtherOrdersService {
    @Autowired
    private IOtherOrdersDao otherOrdersDao;
    @Override
    public List<OtherOrdersVO> getListOtherOrders() {
        return otherOrdersDao.getListOtherOrders();
    }

    @Override
    public List<OtherOrdersVO> getMyOtherOrders(Integer userId) {
        return otherOrdersDao.getMyOtherOrders(userId);
    }

    @Override
    public OtherOrdersVO getOtherOrders(Integer id) {
        return otherOrdersDao.getOtherOrders(id);
    }

    @Override
    public Integer insertOtherOrders(OtherOrdersVO vo) {
        return otherOrdersDao.insertOtherOrders(vo);
    }

    @Override
    public Integer deleteOtherOrders(Integer id) {
        return otherOrdersDao.deleteOtherOrders(id);
    }
}
