package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.UserRoomVO;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRoomDao {
    void insertUserRoom(UserRoomVO vo);
}
