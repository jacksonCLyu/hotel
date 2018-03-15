package com.graduation.design.hotel.service;

import com.graduation.design.hotel.model.RoomInfoVO;

import java.util.Date;
import java.util.List;

/**
 * 房间Service
 */
public interface IRoomService {
    /**
     * 获取所有房间
     * @return
     */
    List<RoomInfoVO> getListRoom();

    /**
     * 根据预订时间查找未预定的房间
     * @return
     */
    List<RoomInfoVO> searchRoom(String checkTime,String leaveTime);

    /**
     * 根据ID查找房间
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
    RoomInfoVO updateRoom(RoomInfoVO vo);

    /**
     * 删除房间
     * @param id
     * @return
     */
    Integer deleteRoom(Integer id);

    /**
     * 更新房间状态
     * @param roomNumber
     * @param flg
     * @return
     */
    String updateFlg(String roomNumber,  Integer flg);

    /**
     * 根据查询条件筛选
     * @param vo
     * @return
     */
    RoomInfoVO findRoom(RoomInfoVO vo);
}
