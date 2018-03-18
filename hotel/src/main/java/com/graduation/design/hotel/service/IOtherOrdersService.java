package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.OtherOrdersVO;

import java.util.List;

/**
 * @author QiShuo
 */
public interface IOtherOrdersService {

    List<OtherOrdersVO> getListOtherOrders();


    List<OtherOrdersVO> getMyOtherOrders(Integer userId);


    OtherOrdersVO getOtherOrders(Integer id);


    Integer insertOtherOrders(OtherOrdersVO vo);



    Integer deleteOtherOrders(Integer id);
}

