package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.MyRoomVO;
import com.graduation.design.hotel.model.UserRoomVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IMyRoomDao {

    List<MyRoomVO> getListMyRoom(Integer userId);

    /**
     * 退订
     */
    void  unsubscribe(@Param("roomNumber") String roomNumber,@Param("userId") Integer userId);

    void deleteUserRoom(UserRoomVO vo);
}
