package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.UserVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 用户Dao
 */
@Repository
public interface IUserDao {
    /**
     * 获取所有用户
     * @return
     */
    List<UserVO> getListUser();

    /**
     * 根据ID查找用户
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
    Integer updateUser(UserVO vo);

    /**
     * 删除用户
     * @param id
     */
    void deleteUser(Integer id);

    /**
     * 用户登录的验证
     * @param name
     * @param password
     * @return
     */
    UserVO getAdminUser(@Param("userAccount") String name, @Param("userPassword") String password);

    /**
     * 获取管理员用户
     * @return
     */
    List<UserVO> getAdminList();
}
