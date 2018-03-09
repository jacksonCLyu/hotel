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
     * 房间的ID
     */
    private Integer roomId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    @Override
    public String toString() {
        return "UserRoomVO{" +
                "userId=" + userId +
                ", roomId=" + roomId +
                '}';
    }
}
