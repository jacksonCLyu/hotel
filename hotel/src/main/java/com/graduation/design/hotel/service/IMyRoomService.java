package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.MyRoomVO;
import com.graduation.design.hotel.model.UserRoomVO;

import java.util.List;

public interface IMyRoomService {

    List<MyRoomVO> getListMyRoom(Integer userId);

    /**
     * 退订
     */
    void  unsubscribe(UserRoomVO vo);
}
