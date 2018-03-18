package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.OtherOrdersVO;
import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.service.IOtherOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author QiShuo
 */
@RestController
@RequestMapping("/otherOrders")
public class OtherOrdersController {
    @Autowired
    private IOtherOrdersService otherOrdersService;

    @GetMapping("/getListOtherOrders")
    public ActionResult<List<OtherOrdersVO>> getListOtherOrders() {
        return ActionResult.New(otherOrdersService.getListOtherOrders());
    }

    @GetMapping("/getOtherOrders/{id}")
    public ActionResult<OtherOrdersVO> getOtherOrders(@PathVariable("id") Integer id) {
        return ActionResult.New(otherOrdersService.getOtherOrders(id));
    }

    @GetMapping("/getMyOtherOrders/{userId}")
    public ActionResult<List<OtherOrdersVO>> getMyOtherOrders(@PathVariable("userId") Integer userId) {
        return ActionResult.New(otherOrdersService.getMyOtherOrders(userId));
    }
    @PostMapping("/insertOtherOrders")
    public ActionResult<Integer> insertOtherOrders(@RequestBody OtherOrdersVO vo) {
        return ActionResult.New(otherOrdersService.insertOtherOrders(vo));
    }


    @DeleteMapping("/deleteOtherOrders/{id}")
    public ActionResult<Integer> deleteOtherOrders(@PathVariable("id") Integer id) {
        return ActionResult.New(otherOrdersService.deleteOtherOrders(id));
    }
}
