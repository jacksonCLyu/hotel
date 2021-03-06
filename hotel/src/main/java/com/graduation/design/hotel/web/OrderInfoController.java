package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.OrderInfoVO;
import com.graduation.design.hotel.model.UserRoomVO;
import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.service.IOrderInfoServic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderInfoController {
    @Autowired
    private IOrderInfoServic orderInfoServic;

    @GetMapping("/getListOrderInfo")
    public ActionResult<List<OrderInfoVO>> getListOrderInfo() {
        List<OrderInfoVO> list = orderInfoServic.getListOrderInfo();
        return ActionResult.New(orderInfoServic.getListOrderInfo());
    }

    @GetMapping("/getOrderInfo/{id}")
    public ActionResult<OrderInfoVO> getOrderInfo(@PathVariable("id") Integer id) {
        return ActionResult.New(orderInfoServic.getOrderInfo(id));
    }

    @GetMapping("/getMyOrderInfo/{userId}")
    public ActionResult<List<OrderInfoVO>> getMyOrderInfo(@PathVariable("userId") Integer userId) {
        return ActionResult.New(orderInfoServic.getMyOrderInfo(userId));
    }
    @PostMapping("/insertOrderInfo")
    public ActionResult<Integer> insertOrderInfo(@RequestBody OrderInfoVO vo) {
        return ActionResult.New(orderInfoServic.insertOrderInfo(vo));
    }
    @PutMapping("/pay/{id}")
    public ActionResult<Boolean> pay(@PathVariable("id") Integer id, @RequestBody UserRoomVO vo) {
        orderInfoServic.pay(id,vo);
        return ActionResult.New(true);
    }
    @PutMapping("/updateOrderInfo/{id}")
    public ActionResult<OrderInfoVO> updateOrderInfo(@PathVariable("id") Integer id, @RequestBody OrderInfoVO vo) {
        vo.setId(id);
        return ActionResult.New(orderInfoServic.updateOrderInfo(vo));
    }

    @DeleteMapping("/deleteOrderInfo/{id}")
    public ActionResult<Integer> deleteOrderInfo(@PathVariable("id") Integer id) {
        return ActionResult.New(orderInfoServic.deleteOrderInfo(id));
    }

}
