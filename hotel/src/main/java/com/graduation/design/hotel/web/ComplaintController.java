package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.EvaAndCompVO;
import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.service.IEvaAndCompService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 投诉Controller
 */
@RestController
@RequestMapping("/complaint")
public class ComplaintController {
    @Autowired
    private IEvaAndCompService evaAndCompService;
    @GetMapping("/getListEvaAndComp")
    public ActionResult<List<EvaAndCompVO>> getListEvaAndComp() {
        return ActionResult.New(evaAndCompService.getListEvaAndComp());
    }
    @GetMapping("/getListEvaOrComp")
    public ActionResult<List<EvaAndCompVO>> getListEvaOrComp(Integer flg) {
        return ActionResult.New(evaAndCompService.getListEvaOrComp(flg));
    }
    @GetMapping("/getMyEvaOrComp")
    public ActionResult<List<EvaAndCompVO>> getMyEvaOrComp(Integer userId, Integer flg) {
        return ActionResult.New(evaAndCompService.getMyEvaOrComp(userId,flg));
    }
    @PostMapping("/inserEvaOrComp")
    public ActionResult<Boolean> inserEvaOrComp(EvaAndCompVO vo) {
        evaAndCompService.inserEvaOrComp(vo);
        return ActionResult.New(true);
    }
    @PutMapping("/updateEvaOrComp/{id}")
    public ActionResult<Integer> updateEvaOrComp(EvaAndCompVO vo) {
        return ActionResult.New(evaAndCompService.updateEvaOrComp(vo));
    }
    @PutMapping("/replyEvaOrComp/{evaId}")
    public ActionResult<Integer> replyEvaOrComp(Integer adminId, Integer evaId, String content) {
        return ActionResult.New(evaAndCompService.replyEvaOrComp(adminId,evaId,content));
    }
    @DeleteMapping("/delteEvaOrComp/{evaId}")
    public ActionResult<Boolean> delteEvaOrComp(Integer evaId) {
        evaAndCompService.delteEvaOrComp(evaId);
        return ActionResult.New(true);
    }
}
