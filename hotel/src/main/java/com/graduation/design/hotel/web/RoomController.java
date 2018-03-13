package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.RoomInfoVO;
import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.service.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    private IRoomService roomService;
    @GetMapping("/getListRoom")
    public ActionResult<List<RoomInfoVO>> getListRoom() {
        return ActionResult.New(roomService.getListRoom());
    }
    @GetMapping("/getRoom/{id}")
    public ActionResult<RoomInfoVO> getRoom(@PathVariable("id") Integer id) {
        return ActionResult.New(roomService.getRoom(id));
    }
    @PostMapping("/insertRoom")
    public ActionResult<Integer> insertRoom(@RequestBody RoomInfoVO vo) {
        return ActionResult.New(roomService.insertRoom(vo));
    }
    @PutMapping("/updateRoom/{id}")
    public ActionResult<RoomInfoVO> updateRoom(@PathVariable("id") Integer id,@RequestBody RoomInfoVO vo) {
        vo.setId(id);
        return ActionResult.New(roomService.updateRoom(vo));
    }
    @DeleteMapping("/deleteRoom/{id}")
    public ActionResult<Integer> deleteRoom(@PathVariable("id") Integer id) {
        return ActionResult.New(roomService.deleteRoom(id));
    }
//    @PutMapping("/updateRoomFlg/{id}")
//    public ActionResult<Integer> updateRoomFlg(@PathVariable("id") Integer id,@RequestBody Integer flg) {
//        return ActionResult.New(roomService.updateFlg(id,flg));
//    }
}
