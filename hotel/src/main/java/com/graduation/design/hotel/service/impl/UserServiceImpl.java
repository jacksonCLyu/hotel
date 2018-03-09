package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IUserDao;
import com.graduation.design.hotel.model.UserVO;
import com.graduation.design.hotel.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private IUserDao userDao;

    @Override
    public List<UserVO> getListUser() {
        return userDao.getListUser();
    }

    @Override
    public UserVO getUser(Integer id) {
        return userDao.getUser(id);
    }

    @Override
    public Integer insertUser(UserVO vo) {
        return userDao.insertUser(vo);
    }

    @Override
    public UserVO updateUser(UserVO vo) {
        userDao.updateUser(vo);
        return vo;
    }

    @Override
    public Integer deleteUser(Integer id) {
        userDao.deleteUser(id);
        return id;
    }

    @Override
    public UserVO getAdminUser(String userAccount, String userPassword) {
        return userDao.getAdminUser(userAccount, userPassword);
    }
}
