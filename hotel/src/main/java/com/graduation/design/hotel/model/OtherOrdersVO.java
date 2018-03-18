package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;

import java.math.BigDecimal;

/**
 * @author QiShuo
 */
public class OtherOrdersVO extends BaseVO {
    /**
     * 用户ID
     */
    private Integer userId;
    /**
     * 用户姓名
     */
    private String userName;
    /**
     * 项目ID
     */
    private Integer casualDietId;
    /**
     * 项目名称
     */
    private String casualDietName;
    /**
     * 价格
     */
    private BigDecimal price;


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getCasualDietId() {
        return casualDietId;
    }

    public void setCasualDietId(Integer casualDietId) {
        this.casualDietId = casualDietId;
    }

    public String getCasualDietName() {
        return casualDietName;
    }

    public void setCasualDietName(String casualDietName) {
        this.casualDietName = casualDietName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "OtherOrdersVO{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", casualDietId=" + casualDietId +
                ", casualDietName='" + casualDietName + '\'' +
                ", price=" + price +
                '}';
    }
}
