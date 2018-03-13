package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IRoomDao;
import com.graduation.design.hotel.model.RoomInfoVO;
import com.graduation.design.hotel.service.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoomServiceImpl implements IRoomService{
    @Autowired
    private IRoomDao roomDao;
    @Override
    public List<RoomInfoVO> getListRoom() {
        return roomDao.getListRoom();
    }

    @Override
    public RoomInfoVO getRoom(Integer id) {
        return roomDao.getRoom(id);
    }

    @Override
    public Integer insertRoom(RoomInfoVO vo) {
        return roomDao.insertRoom(vo);
    }

    @Override
    public RoomInfoVO updateRoom(RoomInfoVO vo) {
        roomDao.updateRoom(vo);
        return vo;
    }

    @Override
    public Integer deleteRoom(Integer id) {
        roomDao.deleteRoom(id);
        return id;
    }

    @Override
    public String updateFlg(String roomNumber, Integer flg) {
        roomDao.updateFlg(roomNumber,flg);
        return roomNumber;
    }

    @Override
    public RoomInfoVO findRoom(RoomInfoVO vo) {
        return roomDao.findRoom(vo);
    }

}
