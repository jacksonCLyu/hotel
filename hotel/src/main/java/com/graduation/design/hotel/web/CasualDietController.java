package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.CasualDietVO;
import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.service.ICasualDietService;
import com.graduation.design.hotel.util.FileBytesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;

/**
 * @author QiShuo
 */
@RestController
@RequestMapping("/casualDiet")
public class CasualDietController {
    @Autowired
    private ICasualDietService casualDietService;

    @RequestMapping(value = "/getListCasualDiet", method = RequestMethod.GET)
    public ActionResult<List<CasualDietVO>> getListCasualDiet() {
        return ActionResult.New(casualDietService.getListCasualDiet());
    }

    @RequestMapping(value = "/getCasualDiet/{id}", method = RequestMethod.GET)
    public ActionResult<CasualDietVO> getCasualDiet(@PathVariable("id") Integer id) {
        return ActionResult.New(casualDietService.getCasualDiet(id));
    }

    @RequestMapping(value = "/insertCasualDiet", method = RequestMethod.POST)
    public ActionResult<Integer> insertCasualDiet(@RequestBody CasualDietVO vo) {
        vo = writePicture(vo);
        return ActionResult.New(casualDietService.insertCasualDiet(vo));
    }

    private CasualDietVO writePicture(CasualDietVO vo) {
        byte[] fileBytes = FileBytesUtil.fileBytes;
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

    @RequestMapping(value = "/updateCasualDiet/{id}", method = RequestMethod.PUT)
    public ActionResult<Integer> updateCasualDiet(@PathVariable("id") Integer id, @RequestBody CasualDietVO vo) {
        return ActionResult.New(casualDietService.updateCasualDiet(vo));
    }

    @RequestMapping(value = "/deleteCasualDiet/{id}", method = RequestMethod.DELETE)
    public ActionResult<Integer> deleteCasualDiet(@PathVariable("id") Integer id) {
        return ActionResult.New(casualDietService.deleteCasualDiet(id));
    }
}
