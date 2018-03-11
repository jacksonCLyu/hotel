package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.MenuVO;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author QiShuo
 */
@Repository
public interface IMenuDao {

    List<MenuVO> getListMenu(Integer menuFlg);
}
