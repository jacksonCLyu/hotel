package com.graduation.design.hotel.util;

import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 响应的工具类
 */
public class ResponseUtil {
    private final String message;
    private final int code;
    private final Map<String, Object> data = new HashMap<String, Object>();
    private final static String XHR_HEADER = "X-Requested-With";
    private final static String XHR_HEADER_VALUE = "XMLHttpRequest";
    private final static String LOGIN_URI = "/Login";
    public String getMessage() {
        return message;
    }

    public int getCode() {
        return code;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public ResponseUtil putDataValue(String key, Object value) {
        data.put(key, value);
        return this;
    }

    private ResponseUtil(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public static ResponseUtil ok() {
        return new ResponseUtil(200, "Ok");
    }

    public static ResponseUtil notFound() {
        return new ResponseUtil(404, "Not Found");
    }

    public static ResponseUtil badRequest() {
        return new ResponseUtil(400, "Bad Request");
    }

    public static ResponseUtil forbidden() {
        return new ResponseUtil(20001, "Forbidden");
    }

    public static ResponseUtil unauthorized() {
        return new ResponseUtil(401, "unauthorized");
    }

    public static ResponseUtil serverInternalError() {
        return new ResponseUtil(500, "Server Internal Error");
    }

    public static ResponseUtil customerError() {
        return new ResponseUtil(1001, "customer Error");
    }
    /**
     * 请求不通过，返回错误信息给客户端
     *
     * @param response
     * @param responseUtil
     */
    public static void responseMessage(HttpServletRequest request, HttpServletResponse response, ResponseUtil responseUtil) {
        boolean isXhr = false;
        String json = null;
        if (XHR_HEADER_VALUE.equalsIgnoreCase(request.getHeader(XHR_HEADER))
                && !LOGIN_URI.equalsIgnoreCase(request.getRequestURI())) {
            response.setContentType("application/json; charset=utf-8");
            json = JSONObject.toJSONString(responseUtil);
            isXhr = true;
        }
        try {
            if (isXhr) {
                response.getWriter().write(json);
                response.flushBuffer();
            } else {
                response.sendRedirect(request.getContextPath() + "/login.html");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
