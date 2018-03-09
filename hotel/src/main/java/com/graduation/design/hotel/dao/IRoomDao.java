package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.RoomInfoVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRoomDao {
    List<RoomInfoVO> getListRoom();

    RoomInfoVO getRoom(Integer id);

    Integer insertRoom(RoomInfoVO vo);

    Integer updateRoom(RoomInfoVO vo);

    void deleteRoom(Integer id);

    void updateFlg(@Param("id") Integer id, @Param("flg") Integer flg);
    /**
     * 根据查询条件筛选
     * @param vo
     * @return
     */
    RoomInfoVO findRoom(RoomInfoVO vo);
}
