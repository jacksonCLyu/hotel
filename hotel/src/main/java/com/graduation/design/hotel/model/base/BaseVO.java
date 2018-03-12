package com.graduation.design.hotel.model.base;

import java.io.Serializable;
import java.util.Date;

public class BaseVO implements Serializable {
    protected Integer id;
    protected Date crateTime;
    protected Date updateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
}
