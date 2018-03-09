package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.UserVO;

import java.util.List;

public interface IUserService {
    List<UserVO> getListUser();

    UserVO getUser(Integer id);

    Integer insertUser(UserVO vo);

    UserVO updateUser(UserVO vo);

    Integer deleteUser(Integer id);

    UserVO getAdminUser(String userAccount, String userPassword);
}
