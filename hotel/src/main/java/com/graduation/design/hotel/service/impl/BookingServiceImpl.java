package com.graduation.design.hotel.service.impl;

import com.graduation.design.hotel.dao.IOrderInfoDao;
import com.graduation.design.hotel.model.OrderInfoVO;
import com.graduation.design.hotel.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Calendar;

@Service
public class BookingServiceImpl implements IBookingService{
    @Autowired
    private IOrderInfoDao orderInfoDao;
    @Override
    public Integer booking(OrderInfoVO vo) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(vo.getCheckTime());
        long time1 = cal.getTimeInMillis();
        cal.setTime(vo.getLeaveTime());
        long time2 = cal.getTimeInMillis();
        long betweenDays=(time2-time1)/(1000*3600*24);
        vo.setPrice(vo.getRoomPrick().multiply( new BigDecimal(betweenDays)));
        return orderInfoDao.insertOrderInfo(vo);
    }
}
