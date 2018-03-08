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
    public UserVO getUser(@PathVariable("id") Integer id) {
        return userService.getUser(id);
    }
    @PostMapping("insertUser")
    public Integer insertUser(@RequestBody UserVO vo) {
        return userService.insertUser(vo);
    }
    @PutMapping("/updateUser/{id}")
    public Integer updateUser(@PathVariable("id") Integer id,@RequestBody UserVO vo) {
        vo.setUserId(id);
        return userService.updateUser(vo);
    }
    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable("id") Integer id) {
        userService.deleteUser(id);
    }
}
