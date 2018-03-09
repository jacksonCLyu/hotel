package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IOrderInfoDao;
import com.graduation.design.hotel.model.OrderInfoVO;
import com.graduation.design.hotel.service.IOrderInfoServic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OrderInfoServicImpl implements IOrderInfoServic {
    @Autowired
    private IOrderInfoDao orderInfoDao;
    @Override
    public List<OrderInfoVO> getListOrderInfo() {
        return orderInfoDao.getListOrderInfo();
    }

    @Override
    public OrderInfoVO getOrderInfo(Integer id) {
        return orderInfoDao.getOrderInfo(id);
    }

    @Override
    public Integer insertOrderInfo(OrderInfoVO vo) {
        return orderInfoDao.insertOrderInfo(vo);
    }

    @Override
    public OrderInfoVO updateOrderInfo(OrderInfoVO vo) {
        orderInfoDao.updateOrderInfo(vo);
        return vo;
    }

    @Override
    public Integer deleteOrderInfo(Integer id) {
        orderInfoDao.deleteOrderInfo(id);
        return id;
    }
}
