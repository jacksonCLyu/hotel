package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.RoomInfoVO;

import java.util.List;

public interface IRoomService {
    List<RoomInfoVO> getListRoom();

    RoomInfoVO getRoom(Integer id);

    Integer insertRoom(RoomInfoVO vo);

    RoomInfoVO updateRoom(RoomInfoVO vo);

    Integer deleteRoom(Integer id);

    String updateFlg(String roomNumber,  Integer flg);

    /**
     * 根据查询条件筛选
     * @param vo
     * @return
     */
    RoomInfoVO findRoom(RoomInfoVO vo);
}
