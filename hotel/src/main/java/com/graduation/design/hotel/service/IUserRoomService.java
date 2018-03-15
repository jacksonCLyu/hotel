package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.UserRoomVO;

/**
 * 用户与房间关系
 */
public interface IUserRoomService {
    /**
     * 新增一条关系
     * @param vo
     */
    void insertUserRoom(UserRoomVO vo);
}
