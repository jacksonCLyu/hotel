package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;

/**
 * 用户与房间的关系
 */
public class UserRoomVO extends BaseVO{
    /**
     * 用户的ID
     */
    private Integer userId;
    /**
     * 房间编号
     */
    private String roomNumber;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    @Override
    public String toString() {
        return "UserRoomVO{" +
                "userId=" + userId +
                ", roomNumber='" + roomNumber + '\'' +
                '}';
    }
}
