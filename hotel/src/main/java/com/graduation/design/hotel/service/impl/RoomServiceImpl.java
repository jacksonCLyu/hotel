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
    public Integer updateRoom(RoomInfoVO vo) {
        return roomDao.updateRoom(vo);
    }

    @Override
    public void deleteRoom(Integer id) {
        roomDao.deleteRoom(id);
    }
}
