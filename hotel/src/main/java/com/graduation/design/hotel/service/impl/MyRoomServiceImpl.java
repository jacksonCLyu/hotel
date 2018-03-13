package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IMyRoomDao;
import com.graduation.design.hotel.model.MyRoomVO;
import com.graduation.design.hotel.model.UserRoomVO;
import com.graduation.design.hotel.service.IMyRoomService;
import com.graduation.design.hotel.service.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MyRoomServiceImpl implements IMyRoomService{
    @Autowired
    private IMyRoomDao myRoomDao;
    @Autowired
    private IRoomService roomService;
    @Override
    public List<MyRoomVO> getListMyRoom(Integer userId) {
        return myRoomDao.getListMyRoom(userId);
    }

    @Override
    @Transactional
    public void unsubscribe(UserRoomVO vo) {
        myRoomDao.unsubscribe(vo.getRoomNumber(),vo.getUserId());
        roomService.updateFlg(vo.getRoomNumber(),1);
        myRoomDao.deleteUserRoom(vo);
    }
}
