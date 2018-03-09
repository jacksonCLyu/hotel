package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.OrderInfoVO;

import java.util.List;

public interface IOrderInfoServic {
    List<OrderInfoVO> getListOrderInfo();

    OrderInfoVO getOrderInfo(Integer id);

    Integer insertOrderInfo(OrderInfoVO vo);

    OrderInfoVO updateOrderInfo(OrderInfoVO vo);

    Integer deleteOrderInfo(Integer id);
}
