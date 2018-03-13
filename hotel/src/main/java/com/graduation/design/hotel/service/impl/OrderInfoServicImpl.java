package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IOrderInfoDao;
import com.graduation.design.hotel.model.OrderInfoVO;
import com.graduation.design.hotel.model.UserRoomVO;
import com.graduation.design.hotel.service.IOrderInfoServic;
import com.graduation.design.hotel.service.IRoomService;
import com.graduation.design.hotel.service.IUserRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class OrderInfoServicImpl implements IOrderInfoServic {
    @Autowired
    private IOrderInfoDao orderInfoDao;
    @Autowired
    private IUserRoomService userRoomService;
    @Autowired
    private IRoomService roomService;
    @Override
    public List<OrderInfoVO> getListOrderInfo() {
        return orderInfoDao.getListOrderInfo();
    }

    @Override
    public List<OrderInfoVO> getMyOrderInfo(Integer userId) {
        return orderInfoDao.getMyOrderInfo(userId);
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

    @Override
    @Transactional
    public void pay(Integer id, UserRoomVO vo) {
        orderInfoDao.pay(id);
        roomService.updateFlg(vo.getRoomNumber(),2);
        userRoomService.insertUserRoom(vo);
    }
}
