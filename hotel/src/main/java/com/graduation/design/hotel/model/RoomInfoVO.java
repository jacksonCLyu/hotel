package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;

import java.math.BigDecimal;

/**
 * 房间信息实体
 */
public class RoomInfoVO extends BaseVO {
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
    @Override
    public String toString() {
        return "RoomInfoVO{" +
                "roomNumber=" + roomNumber +
                ", price=" + price +
                ", standard=" + standard +
                '}';
    }
}
