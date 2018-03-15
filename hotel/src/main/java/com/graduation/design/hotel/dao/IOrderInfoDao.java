package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.OrderInfoVO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 订单Dao
 */
@Repository
public interface IOrderInfoDao {
    /**
     * 获取所有订单
     * @return
     */
    List<OrderInfoVO> getListOrderInfo();

    /**
     * 获取根据ID查询订单
     * @param id
     * @return
     */
    OrderInfoVO getOrderInfo(Integer id);

    /**
     * 新增订单
     * @param vo
     * @return
     */
    Integer insertOrderInfo(OrderInfoVO vo);

    /**
     * 更新订单
     * @param vo
     * @return
     */
    OrderInfoVO updateOrderInfo(OrderInfoVO vo);

    /**
     * 删除订单
     * @param id
     * @return
     */
    Integer deleteOrderInfo(Integer id);

    /**
     * 获取用户的订单
     * @param userId
     * @return
     */
    List<OrderInfoVO> getMyOrderInfo(Integer userId);
    /**
     * 支付
     * @param id
     */
    void pay(Integer id);
}
