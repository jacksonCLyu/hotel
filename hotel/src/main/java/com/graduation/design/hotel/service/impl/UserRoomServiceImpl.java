package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IUserRoomDao;
import com.graduation.design.hotel.model.UserRoomVO;
import com.graduation.design.hotel.service.IUserRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRoomServiceImpl implements IUserRoomService {
    @Autowired
    private IUserRoomDao userRoomDao;
    @Override
    public void insertUserRoom(UserRoomVO vo) {
        userRoomDao.insertUserRoom(vo);
    }
}
