package com.restaurant_backend.restaurant_backend.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
@RestController
@RequestMapping("restaurant")
@CrossOrigin
public class FileController {

    public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/webapp/images";
    private final Path imageFolder = Paths.get(uploadDirectory);


    @GetMapping("/api/images")
    ResponseEntity<Resource> getImage(@RequestParam("image") String imageName)
    {
        try {
            Path imgPath = imageFolder.resolve(imageName);
            File imageFile = imgPath.toFile();
            if (!imageFile.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Resource resource = new FileSystemResource(imageFile);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // Adjust MIME type based on your image type
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
