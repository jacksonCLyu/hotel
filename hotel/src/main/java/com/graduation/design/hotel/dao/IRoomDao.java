package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.RoomInfoVO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRoomDao {
    List<RoomInfoVO> getListRoom();

    RoomInfoVO getRoom(Integer id);

    Integer insertRoom(RoomInfoVO vo);

    Integer updateRoom(RoomInfoVO vo);

    void deleteRoom(Integer id);
}
