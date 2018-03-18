package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;

import java.math.BigDecimal;

/**
 * @author QiShuo
 */
public class CasualDietVO extends BaseVO{
    /**
     * 项目名称
     */
    private String name;
    /**
     * 价格
     */
    private BigDecimal price;
    /**
     * 图片地址
     */
    private String path;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "CasualDietVO{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", path='" + path + '\'' +
                '}';
    }
}
