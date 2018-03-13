package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.OrderInfoVO;
import com.graduation.design.hotel.model.UserRoomVO;

import java.util.List;

public interface IOrderInfoServic {
    List<OrderInfoVO> getListOrderInfo();

    List<OrderInfoVO> getMyOrderInfo(Integer userId);

    OrderInfoVO getOrderInfo(Integer id);

    Integer insertOrderInfo(OrderInfoVO vo);

    OrderInfoVO updateOrderInfo(OrderInfoVO vo);

    Integer deleteOrderInfo(Integer id);

    /**
     * 支付
     * @param id
     */
    void pay(Integer id, UserRoomVO vo);
}
