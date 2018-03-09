package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 订单信息
 */
public class OrderInfoVO extends BaseVO{
    /**
     * 用户的ID
     */
    private Integer userId;
    /**
     * 订单的价格
     */
    private BigDecimal price;
    /**
     * 入住时间
     */
    private Date checkTime;
    /**
     * 离开时间
     */
    private Date leaveTime;
    /**
     * 房间编号
     */
    private Integer roomNumber;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Date getCheckTime() {
        return checkTime;
    }

    public void setCheckTime(Date checkTime) {
        this.checkTime = checkTime;
    }

    public Date getLeaveTime() {
        return leaveTime;
    }

    public void setLeaveTime(Date leaveTime) {
        this.leaveTime = leaveTime;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }
}
