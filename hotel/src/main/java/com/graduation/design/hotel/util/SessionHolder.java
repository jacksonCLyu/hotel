package com.graduation.design.hotel.util;

import com.graduation.design.hotel.model.UserVO;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionHolder {
    private static final String userContextKey = "assertion";
    public static UserVO getLoginUser() {
        return (UserVO) getSessionAttribute(userContextKey);
    }

    public static void setLoginUser(UserVO vo) {
        HttpSession session= getSession();
        session.setAttribute(userContextKey, vo);
    }
    public static Object getSessionAttribute(String attribute) {
        return getSession().getAttribute(attribute);
    }
    public static void setSession(String attribute, Object value) {
        getSession().setAttribute(attribute, value);
    }
    private static HttpSession getSession(){
        return getRequest().getSession();
    }
    private static HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }
}
