package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.UserVO;
import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.service.IUserService;
import com.graduation.design.hotel.util.SessionHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")
public class LoginController {
    @Autowired
    private IUserService userService;

    @RequestMapping("/login")
    public ActionResult<Integer> login(String userAccount, String password) {
        UserVO user = userService.getAdminUser(userAccount, password);
        if (null == user) {
            return ActionResult.New(1, "账号或密码错误");
        } else {
            SessionHolder.setLoginUser(user);
            return ActionResult.New(0);
        }
    }
    @GetMapping(value = "/loginOut")
    public ModelAndView loginOut(HttpServletRequest request,HttpServletResponse response) {
        SessionHolder.setLoginUser(null);
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            cookie.setMaxAge(0);
            response.addCookie(cookie);
        }
        return new ModelAndView("redirect:/login.html");
    }
}
