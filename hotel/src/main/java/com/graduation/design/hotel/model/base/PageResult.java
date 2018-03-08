package com.graduation.design.hotel.model.base;

import java.util.List;

public class PageResult<T> extends ActionResult<List<T>>
{
    private int count;

    public static <T> PageResult<T> New(List<T> data, int count)
    {
        PageResult<T> result = new PageResult<T>();
        result.setCode(0);
        result.setDate(data);
        result.setCount(count);
        return result;
    }

    public static <T> PageResult<T> New(String errorMessage, int code)
    {
        PageResult<T> result = new PageResult<T>();
        result.setCode(code);
        result.setError(errorMessage);
        return result;
    }

    public int getCount()
    {
        return count;
    }

    public void setCount(int count)
    {
        this.count = count;
    }
}
