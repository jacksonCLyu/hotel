package com.graduation.design.hotel.dao;

import com.graduation.design.hotel.model.RoomInfoVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * 房间Dao
 */
@Repository
public interface IRoomDao {
    /**
     * 获取所有房间
     * @return
     */
    List<RoomInfoVO> getListRoom();

    /**
     * 根据ID查找对应房间
     * @param id
     * @return
     */
    RoomInfoVO getRoom(Integer id);

    /**
     * 新增房间
     * @param vo
     * @return
     */
    Integer insertRoom(RoomInfoVO vo);

    /**
     * 更新房间
     * @param vo
     * @return
     */
    Integer updateRoom(RoomInfoVO vo);

    /**
     * 删除房间
     * @param id
     */
    void deleteRoom(Integer id);

    /**
     * 更新房间状态
     * @param roomNumber
     * @param flg
     */
    void updateFlg(@Param("roomNumber") String roomNumber, @Param("flg") Integer flg);
    /**
     * 根据查询条件筛选
     * @param vo
     * @return
     */
    RoomInfoVO findRoom(RoomInfoVO vo);

    /**
     * 根据预订时间查找未预定的房间
     * @return
     */
    List<RoomInfoVO> searchRoom(@Param("checkTime") String checkTime, @Param("leaveTime")String leaveTime);
}
