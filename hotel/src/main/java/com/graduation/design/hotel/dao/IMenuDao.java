package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.MenuVO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 获取菜单Dao
 */
@Repository
public interface IMenuDao {

    List<MenuVO> getListMenu(Integer menuFlg);
}
