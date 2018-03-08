package com.graduation.design.hotel.model;

import java.io.Serializable;

/**
 * 用户与房间的关系
 */
public class UserRoomVO implements Serializable{
    private Integer id;
    /**
     * 用户的ID
     */
    private Integer userId;
    /**
     * 房间的ID
     */
    private Integer roomId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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
                "id=" + id +
                ", userId=" + userId +
                ", roomId=" + roomId +
                '}';
    }
}
