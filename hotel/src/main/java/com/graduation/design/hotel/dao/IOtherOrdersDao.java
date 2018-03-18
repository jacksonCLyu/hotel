package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.OtherOrdersVO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author QiShuo
 */
@Repository
public interface IOtherOrdersDao {
    List<OtherOrdersVO> getListOtherOrders();


    List<OtherOrdersVO> getMyOtherOrders(Integer userId);


    OtherOrdersVO getOtherOrders(Integer id);


    Integer insertOtherOrders(OtherOrdersVO vo);



    Integer deleteOtherOrders(Integer id);
}
