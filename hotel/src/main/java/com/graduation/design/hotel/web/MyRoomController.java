package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.MyRoomVO;
import com.graduation.design.hotel.model.UserRoomVO;
import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.service.IMyRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/myRoom")
public class MyRoomController {
    @Autowired
    private IMyRoomService myRoomService;
    @GetMapping("/getListMyRoom/{userId}")
    public ActionResult<List<MyRoomVO>> getListMyRoom(@PathVariable("userId") Integer userId) {
        return ActionResult.New(myRoomService.getListMyRoom(userId));
    }

    @PutMapping("/unsubscribe/{userId}")
    public ActionResult<Boolean> unsubscribe(@PathVariable("userId")Integer userId,@RequestBody UserRoomVO vo) {
        vo.setUserId(userId);
        myRoomService.unsubscribe(vo);
        return ActionResult.New(true);
    }

}
