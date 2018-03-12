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
     * 用户姓名
     */
    private String userName;
    /**
     * 订单的价格
     */
    private BigDecimal price;
    /**
     * 房间价格
     */
    private BigDecimal roomPrick;
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
    private String roomNumber;
    /**
     * 订单状态1:待支付,2:已支付
     */
    private Integer flg;

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

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getFlg() {
        return flg;
    }

    public void setFlg(Integer flg) {
        this.flg = flg;
    }

    public BigDecimal getRoomPrick() {
        return roomPrick;
    }

    public void setRoomPrick(BigDecimal roomPrick) {
        this.roomPrick = roomPrick;
    }

    @Override
    public String toString() {
        return "OrderInfoVO{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", price=" + price +
                ", roomPrick=" + roomPrick +
                ", checkTime=" + checkTime +
                ", leaveTime=" + leaveTime +
                ", roomNumber='" + roomNumber + '\'' +
                ", flg=" + flg +
                '}';
    }
}
