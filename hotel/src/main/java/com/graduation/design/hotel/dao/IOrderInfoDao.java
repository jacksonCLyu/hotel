package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.OrderInfoVO;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IOrderInfoDao {
    List<OrderInfoVO> getListOrderInfo();

    OrderInfoVO getOrderInfo(Integer id);

    Integer insertOrderInfo(OrderInfoVO vo);

    OrderInfoVO updateOrderInfo(OrderInfoVO vo);

    Integer deleteOrderInfo(Integer id);

    List<OrderInfoVO> getMyOrderInfo(Integer userId);
    /**
     * 支付
     * @param id
     */
    void pay(Integer id);
}
