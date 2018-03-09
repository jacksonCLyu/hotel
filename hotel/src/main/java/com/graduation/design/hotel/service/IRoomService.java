package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.RoomInfoVO;

import java.util.List;

public interface IRoomService {
    List<RoomInfoVO> getListRoom();

    RoomInfoVO getRoom(Integer id);

    Integer insertRoom(RoomInfoVO vo);

    RoomInfoVO updateRoom(RoomInfoVO vo);

    Integer deleteRoom(Integer id);

    Integer updateFlg(Integer id,  Integer flg);
}
