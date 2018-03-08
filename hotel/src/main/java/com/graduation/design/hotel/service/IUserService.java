package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.UserVO;

import java.util.List;

public interface IUserService {
    List<UserVO> getListUser();

    UserVO getUser(Integer id);

    Integer insertUser(UserVO vo);

    Integer updateUser(UserVO vo);

    void deleteUser(Integer id);

    Integer getAdminUser(String userAccount, String userPassword);
}
