package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.OrderInfoVO;

/**
 * 预订Service
 */
public interface IBookingService {
    /**
     * 预订
     * @param vo
     * @return
     */
    Integer booking(OrderInfoVO vo);
}
