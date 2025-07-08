package com.shruti.visionboard.controller;

import com.shruti.visionboard.model.Vision;
import com.shruti.visionboard.service.VisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "https://visionboardshruti.netlify.app")
@RequestMapping("/api/vision")
public class VisionController {

    @Autowired
    private VisionService visionService;

    @GetMapping(value = {"", "/"})
    public ResponseEntity<List<Vision>> getAllVisions() {
        return ResponseEntity.ok(visionService.getAllVisions());
    }


    @GetMapping("/achieved")
    public ResponseEntity<List<Vision>> getAchievedVisions() {
        return ResponseEntity.ok(visionService.getArchivedVisions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vision> getVisionById(@PathVariable int id) {
        Vision vision = visionService.getVisionById(id);
        return vision != null
                ? ResponseEntity.ok(vision)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addVision(@RequestPart("vision") Vision vision,
                                       @RequestPart("imageFile") MultipartFile imageFile) {
        try {
            Vision saved = visionService.addVision(vision, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving vision: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateVision(@PathVariable int id,
                                          @RequestPart("vision") Vision vision,
                                          @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            Vision updated = visionService.updateVision(id, vision, imageFile);
            return updated != null
                    ? ResponseEntity.ok("Updated successfully")
                    : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vision not found");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update failed: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/archive")
    public ResponseEntity<?> markAsAchieved(@PathVariable int id) {
        boolean success = visionService.markAsAchieved(id);
        return success
                ? ResponseEntity.ok("Marked as achieved")
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vision not found");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVision(@PathVariable int id) {
        Vision vision = visionService.getVisionById(id);
        if (vision != null) {
            visionService.deleteVision(id);
            return ResponseEntity.ok("Deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vision not found");
        }
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable int id) {
        Vision vision = visionService.getVisionById(id);
        if (vision != null && vision.getImageData() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(vision.getImageType()))
                    .body(vision.getImageData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public List<Vision> printAllVisions() {
        return visionService.printAllVisions(); // This should return all, not just non-archived
    }

}
