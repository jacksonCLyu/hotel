package com.graduation.design.hotel.web;

import com.graduation.design.hotel.model.base.ActionResult;
import com.graduation.design.hotel.util.FileBytesUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * @author QiShuo
 */
@RestController
@RequestMapping("/upload")
public class UploadController {
    @PostMapping("picture")
    public ActionResult<Boolean> uploadPicture(MultipartHttpServletRequest request) throws IOException {
        MultipartFile file = request.getFile("file");
        FileBytesUtil.fileBytes=file.getBytes();
        return ActionResult.New(true);
    }
}
