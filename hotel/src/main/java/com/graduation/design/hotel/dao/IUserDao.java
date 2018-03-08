package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.UserVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IUserDao {
    List<UserVO> getListUser();
    UserVO getUser(Integer id);
    Integer insertUser(UserVO vo);
    Integer updateUser(UserVO vo);
    void  deleteUser(Integer id);
    Integer getAdminUser(@Param("userAccount") String name, @Param("userPassword")String password);
}
