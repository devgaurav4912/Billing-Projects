package com.restaurant_backend.restaurant_backend.service.impl;

import com.cloudinary.Cloudinary;
import com.restaurant_backend.restaurant_backend.service.CloudinaryImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryImageServiceImpl implements CloudinaryImageService {

    @Autowired
    private Cloudinary cloudinary;
    @Override
    public Map upload(MultipartFile file) {
        try {
            Map data = cloudinary.uploader().upload(file.getBytes(),Map.of());
            //SET PRODUCT TO IMAGE

            return  data;
        } catch (IOException e) {
            throw new RuntimeException("Image uploading fail !!");
        }
    }

}
