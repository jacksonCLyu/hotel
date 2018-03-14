package com.graduation.design.hotel.model;

import com.graduation.design.hotel.model.base.BaseVO;

/**
 * 用户评价+投诉实体
 */
public class EvaAndCompVO extends BaseVO {
    /**
     * 用户ID
     */
    private Integer user_id;
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
     * 1:评价2:回复
     */
    private Integer flg;

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
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

    @Override
    public String toString() {
        return "EvaluationOfComplaintsVO{" +
                "user_id=" + user_id +
                ", content='" + content + '\'' +
                ", score=" + score +
                ", reply='" + reply + '\'' +
                ", adminId=" + adminId +
                ", flg=" + flg +
                ", id=" + id +
                ", crateTime=" + crateTime +
                ", updateTime=" + updateTime +
                '}';
    }
}
