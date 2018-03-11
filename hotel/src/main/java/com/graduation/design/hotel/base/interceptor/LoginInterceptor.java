//package com.graduation.design.hotel.base.interceptor;
//
//import com.graduation.design.hotel.model.UserVO;
//import com.graduation.design.hotel.util.SessionHolder;
//import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///**
// * @author QiShuo
// */
//public class LoginInterceptor extends HandlerInterceptorAdapter {
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        UserVO user = SessionHolder.getLoginUser();
//        if(null == user){
//            return false;
//        }else{
//            return true;
//        }
//    }
//}
