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

    @GetMapping("/getAdminList")
    public ActionResult<List<UserVO>> getAdminList() {
        return ActionResult.New(userService.getAdminList());
    }

    @GetMapping("/getUser/{id}")
    public ActionResult<UserVO> getUser(@PathVariable("id") Integer id) {
        return ActionResult.New(userService.getUser(id));
    }

    @PostMapping("/insertUser")
    public ActionResult<Integer> insertUser(@RequestBody UserVO vo) {
        return ActionResult.New(userService.insertUser(vo));
    }

    @PostMapping("/insertUserVO")
    public ActionResult<Integer> insertUserVO(String userAccount, String userName, String password, String userId, Integer userPhone, Integer userAge) {
        UserVO vo=new UserVO();
        vo.setUserAccount(userAccount);
        vo.setUserName(userName);
        vo.setUserPassword(password);
        vo.setUserId(userId);
        vo.setUserPhone(userPhone);
        vo.setUserAge(userAge);
        vo.setFlg(0);
        return ActionResult.New(userService.insertUser(vo));
    }

    @PutMapping("/updateUser/{id}")
    public ActionResult<UserVO> updateUser(@PathVariable("id") Integer id, @RequestBody UserVO vo) {
        vo.setId(id);
        return ActionResult.New(userService.updateUser(vo));
    }

    @DeleteMapping("/deleteUser/{id}")
    public ActionResult<Integer> deleteUser(@PathVariable("id") Integer id) {
        return ActionResult.New(userService.deleteUser(id));
    }
}
