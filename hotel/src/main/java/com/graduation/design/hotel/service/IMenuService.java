package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.MenuVO;

import java.util.List;

/**
 * @author QiShuo
 * 只提供查询菜单的接口，其他功能若需要在添加
 */
public interface IMenuService {
    List<MenuVO> getListMenu(Integer menuFlg);
}
