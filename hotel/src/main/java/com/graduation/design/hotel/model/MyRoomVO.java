package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;

import java.util.Date;

public class MyRoomVO extends BaseVO{
    /**
     * 房间编号
     */
    private String roomNumber;

    /**
     * 入住时间
     */
    private Date checkTime;
    /**
     * 离开时间
     */
    private Date leaveTime;
    /**
     * 房间标准 1:标间2:大床房3:情侣主题4:豪华总统间
     */
    private Integer standard;

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
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

    public Integer getStandard() {
        return standard;
    }

    public void setStandard(Integer standard) {
        this.standard = standard;
    }

    @Override
    public String toString() {
        return "MyRoomVO{" +
                "roomNumber='" + roomNumber + '\'' +
                ", checkTime=" + checkTime +
                ", leaveTime=" + leaveTime +
                ", standard=" + standard +
                '}';
    }
}
