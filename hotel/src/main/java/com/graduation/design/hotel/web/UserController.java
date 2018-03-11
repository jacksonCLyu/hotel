package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.model.UserVO;
import com.graduation.design.hotel.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private IUserService userService;
    @GetMapping("/getListUser")
    public ActionResult<List<UserVO>> getListUser() {
        return ActionResult.New(userService.getListUser());
    }
    @GetMapping("/getUser/{id}")
    public ActionResult<UserVO> getUser(@PathVariable("id") Integer id) {
        return ActionResult.New(userService.getUser(id));
    }
    @PostMapping("/insertUser")
    public ActionResult<Integer> insertUser(@RequestBody UserVO vo) {
        return ActionResult.New(userService.insertUser(vo));
    }
    @PutMapping("/updateUser/{id}")
    public ActionResult<UserVO> updateUser(@PathVariable("id") Integer id,@RequestBody UserVO vo) {
        vo.setId(id);
        return ActionResult.New(userService.updateUser(vo));
    }
    @DeleteMapping("/deleteUser/{id}")
    public ActionResult<Integer> deleteUser(@PathVariable("id") Integer id) {
        return ActionResult.New(userService.deleteUser(id));
    }
}
