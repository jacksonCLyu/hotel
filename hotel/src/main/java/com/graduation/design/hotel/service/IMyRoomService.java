package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.MyRoomVO;
import com.graduation.design.hotel.model.UserRoomVO;

import java.util.List;

/**
 * 用户的房间
 */
public interface IMyRoomService {
    /**
     * 获取用户的房间
     * @param userId
     * @return
     */
    List<MyRoomVO> getListMyRoom(Integer userId);

    /**
     * 退订
     */
    void  unsubscribe(UserRoomVO vo);
}
