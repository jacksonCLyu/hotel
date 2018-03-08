package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.RoomInfoVO;

import java.util.List;

public interface IRoomService {
    List<RoomInfoVO> getListRoom();

    RoomInfoVO getRoom(Integer id);

    Integer insertRoom(RoomInfoVO vo);

    Integer updateRoom(RoomInfoVO vo);

    void deleteRoom(Integer id);
}
