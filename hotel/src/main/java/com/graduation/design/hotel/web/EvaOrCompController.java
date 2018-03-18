package com.graduation.design.hotel.web;

import com.alibaba.fastjson.JSONObject;
import com.graduation.design.hotel.model.EvaAndCompVO;
import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.service.IEvaAndCompService;
import com.graduation.design.hotel.util.FileBytesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;

/**
 * 评论Controller
 */
@RestController
@RequestMapping("/evaOrComp")
public class EvaOrCompController {
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
        return ActionResult.New(evaAndCompService.getMyEvaOrComp(userId, flg));
    }

    @PostMapping("/inserEvaOrComp")
    public ActionResult<Boolean> inserEvaOrComp(@RequestBody EvaAndCompVO vo) {
        vo=writePicture(vo);
        evaAndCompService.inserEvaOrComp(vo);
        return ActionResult.New(true);
    }

    @PutMapping("/updateEvaOrComp/{id}")
    public ActionResult<Integer> updateEvaOrComp(@PathVariable("id") Integer id, @RequestBody EvaAndCompVO vo) {
        vo=writePicture(vo);
        vo.setId(id);
        return ActionResult.New(evaAndCompService.updateEvaOrComp(vo));
    }
    private EvaAndCompVO writePicture(EvaAndCompVO vo){
        byte[] fileBytes = null;
        if (null == vo.getNumber() || 0 == vo.getNumber()) {
            FileBytesUtil.fileBytes = null;
        } else {
            fileBytes = FileBytesUtil.fileBytes;
        }
        if (null != fileBytes) {
            String uuid = UUID.randomUUID().toString().replaceAll("-", "");
            File imageFile = new File("./src/main/resources/static/img/" + uuid + ".jpg");
            try (FileOutputStream fos = new FileOutputStream(imageFile)) {
                fos.write(fileBytes);
                vo.setPath("./img/" + uuid + ".jpg");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return vo;
    }
    @PutMapping("/replyEvaOrComp/{evaId}")
    public ActionResult<Integer> replyEvaOrComp(@RequestBody JSONObject json, @PathVariable("evaId") Integer evaId) {
        Integer adminId = json.getInteger("adminId");
        String content = json.getString("content");
        if (StringUtils.isEmpty(content)) {
            return ActionResult.New(0);
        }

        return ActionResult.New(evaAndCompService.replyEvaOrComp(adminId, evaId, content));
    }

    @DeleteMapping("/delteEvaOrComp/{evaId}")
    public ActionResult<Boolean> delteEvaOrComp(@PathVariable("evaId") Integer evaId) {
        evaAndCompService.delteEvaOrComp(evaId);
        return ActionResult.New(true);
    }
}

