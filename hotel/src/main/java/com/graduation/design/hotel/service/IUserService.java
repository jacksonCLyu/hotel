package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.UserVO;

import java.util.List;

/**
 * 用户Service
 */
public interface IUserService {
    /**
     * 获取所有用户
     * @return
     */
    List<UserVO> getListUser();

    /**
     * 获取所有管理员
     * @return
     */
    List<UserVO> getAdminList();

    /**
     * 获取用户
     * @param id
     * @return
     */
    UserVO getUser(Integer id);

    /**
     * 新增用户
     * @param vo
     * @return
     */
    Integer insertUser(UserVO vo);

    /**
     * 更新用户
     * @param vo
     * @return
     */
    UserVO updateUser(UserVO vo);

    /**
     * 删除用户
     * @param id
     * @return
     */
    Integer deleteUser(Integer id);

    /**
     * 登录验证
     * @param userAccount
     * @param userPassword
     * @return
     */
    UserVO getAdminUser(String userAccount, String userPassword);
}
