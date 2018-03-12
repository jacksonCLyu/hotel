package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.OrderInfoVO;
import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    private IBookingService bookingService;

    @PostMapping("/book")
    public ActionResult<Boolean> book(@RequestBody OrderInfoVO vo) {
        bookingService.booking(vo);
        return ActionResult.New(true);
    }
}
