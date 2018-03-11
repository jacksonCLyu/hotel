package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;


/**
 * 用户信息实体
 */
public class UserVO extends BaseVO {

    /**
     * 账号
     */
    private String userAccount;
    /**
     * 密码
     */
    private String userPassword;
    /**
     * 姓名
     */
    private String userName;
    /**
     * 身份证号
     */
    private String userId;
    /**
     * 年龄
     */
    private Integer userAge;
    /**
     * 标志 ：标识：0：用户 1：管理员
     */
    private Integer flg;
    /**
     * 用户手机号
     */
    private Integer userPhone;

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getUserAge() {
        return userAge;
    }

    public void setUserAge(Integer userAge) {
        this.userAge = userAge;
    }

    public Integer getFlg() {
        return flg;
    }

    public void setFlg(Integer flg) {
        this.flg = flg;
    }

    public Integer getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(Integer userPhone) {
        this.userPhone = userPhone;
    }

    @Override
    public String toString() {
        return "UserVO{" +
                "userAccount='" + userAccount + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userName='" + userName + '\'' +
                ", userId=" + userId +
                ", userAge=" + userAge +
                ", flg=" + flg +
                ", userPhone=" + userPhone +
                '}';
    }
}
