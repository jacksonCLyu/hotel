package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;

/**
 * 用户评价+投诉实体
 */
public class EvaAndCompVO extends BaseVO {
    /**
     * 用户ID
     */
    private Integer userId;
    /**
     * 用户姓名
     */
    private String userName;
    /**
     * 评价或投诉内容
     */
    private String content;
    /**
     * 评分1好评,2中评,3差评
     */
    private Integer score;
    /**
     * 管理员的回复
     */
    private String reply;
    /**
     * 管理员的ID
     */
    private Integer adminId;
    /**
     * 管理员名称
     */
    private String adminName;
    /**
     * 1:评价2:投诉
     */
    private Integer flg;
    /**
     * 图片的路径
     */
    private String path;
    /**
     * 前端上传图片的数量
     */
    private Integer number;
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public Integer getFlg() {
        return flg;
    }

    public void setFlg(Integer flg) {
        this.flg = flg;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    @Override
    public String toString() {
        return "EvaAndCompVO{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", content='" + content + '\'' +
                ", score=" + score +
                ", reply='" + reply + '\'' +
                ", adminId=" + adminId +
                ", adminName='" + adminName + '\'' +
                ", flg=" + flg +
                ", path='" + path + '\'' +
                ", number=" + number +
                '}';
    }
}
