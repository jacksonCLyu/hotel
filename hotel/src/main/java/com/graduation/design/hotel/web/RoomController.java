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
    @PostMapping("insertRoom")
    public Integer insertRoom(@RequestBody RoomInfoVO vo) {
        return roomService.insertRoom(vo);
    }
    @PutMapping("/updateRoom/{id}")
    public Integer updateRoom(@PathVariable("id") Integer id,@RequestBody RoomInfoVO vo) {
        vo.setId(id);
        return roomService.updateRoom(vo);
    }
    @DeleteMapping("/deleteRoom/{id}")
    public void deleteRoom(@PathVariable("id") Integer id) {
        roomService.deleteRoom(id);
    }
}
