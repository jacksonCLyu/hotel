package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;

/**
 * @author QiShuo
 */
public class MenuVO extends BaseVO {
    /**
     * 菜单名称
     */
    private String menuName;
    /**
     * 前端路由
     */
    private String menuUrl;
    /**
     * 后端uri
     */
    private String menuUri;
    /**
     * 菜单标志 1表示用户权限，2：管理员权限，3：用户与管理员共享',
     */
    private Integer menuFlg;

    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    public String getMenuUri() {
        return menuUri;
    }

    public void setMenuUri(String menuUri) {
        this.menuUri = menuUri;
    }

    public Integer getMenuFlg() {
        return menuFlg;
    }

    public void setMenuFlg(Integer menuFlg) {
        this.menuFlg = menuFlg;
    }

    @Override
    public String toString() {
        return "MenuVO{" +
                "menuName='" + menuName + '\'' +
                ", menuUrl='" + menuUrl + '\'' +
                ", menuUri='" + menuUri + '\'' +
                ", menuFlg=" + menuFlg +
                '}';
    }
}
