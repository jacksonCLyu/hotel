package com.graduation.design.hotel.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 房间信息实体
 */
public class RoomInfoVO implements Serializable {
    private Integer id;
    /**
     * 房间编号
     */
    private Integer roomNumber;
    /**
     * 价格
     */
    private BigDecimal price;
    /**
     * 房间标准 1:标间2:大床房3:情侣主题4:豪华总统间
     */
    private Integer standard;
    private Date crateTime;
    private Date updateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStandard() {
        return standard;
    }

    public void setStandard(Integer standard) {
        this.standard = standard;
    }

    public Date getCrateTime() {
        return crateTime;
    }

    public void setCrateTime(Date crateTime) {
        this.crateTime = crateTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "RoomInfoVO{" +
                "id=" + id +
                ", roomNumber=" + roomNumber +
                ", price=" + price +
                ", standard=" + standard +
                ", crateTime=" + crateTime +
                ", updateTime=" + updateTime +
                '}';
    }
}
