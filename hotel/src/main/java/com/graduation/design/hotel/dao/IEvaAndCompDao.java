package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.EvaAndCompVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 评论+投诉DAO
 */
@Repository
public interface IEvaAndCompDao {
    /**
     * 获取所有的评价和投诉
     * @return
     */
    List<EvaAndCompVO> getListEvaAndComp();

    /**
     * 根据标记获取所有评价或投诉
     * @param flg
     * @return
     */
    List<EvaAndCompVO> getListEvaOrComp(Integer flg);

    /**
     * 获取自己的评论或投诉
     * @param userId
     * @param flg
     * @return
     */
    List<EvaAndCompVO> getMyEvaOrComp(@Param("userId") Integer userId, @Param("flg")Integer flg);

    /**
     * 新增评论或投诉
     * @param vo
     */
    void inserEvaOrComp(EvaAndCompVO vo);

    /**
     * 修改用户的评论或投诉
     * @param vo
     * @return
     */
    Integer updateEvaOrComp(EvaAndCompVO vo);

    /**
     * 管理员的回复
     * @param adminId 管理员ID
     * @param evaId 评论或投诉的ID
     * @param content 管理员回复的内容
     * @return
     */
    Integer replyEvaOrComp(@Param("adminId") Integer adminId,@Param("evaId")Integer evaId,@Param("content")String content);

    /**
     * 删除
     * @param evaId 评论或投诉的ID
     */
    void delteEvaOrComp(Integer evaId);
}
