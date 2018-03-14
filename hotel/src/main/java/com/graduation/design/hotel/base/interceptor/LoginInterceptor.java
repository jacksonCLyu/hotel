package com.graduation.design.hotel.base.interceptor;

import com.graduation.design.hotel.model.UserVO;
import com.graduation.design.hotel.util.ResponseUtil;
import com.graduation.design.hotel.util.SessionHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 简单的登录拦截器
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        UserVO user = SessionHolder.getLoginUser();
        if(null == user){
            ResponseUtil.responseMessage(request,response,ResponseUtil.forbidden());
            return false;
        }else{
            return true;
        }
    }
}
