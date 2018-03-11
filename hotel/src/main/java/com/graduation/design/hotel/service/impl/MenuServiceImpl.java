package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IMenuDao;
import com.graduation.design.hotel.model.MenuVO;
import com.graduation.design.hotel.service.IMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author QiShuo
 */
@Service
public class MenuServiceImpl implements IMenuService {
    @Autowired
    private IMenuDao menuDao;
    @Override
    public List<MenuVO> getListMenu(Integer menuFlg) {
        return menuDao.getListMenu(menuFlg);
    }
}
