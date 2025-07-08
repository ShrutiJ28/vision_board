package com.shruti.visionboard.service;

import com.shruti.visionboard.model.Vision;
import com.shruti.visionboard.repo.VisionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class VisionService {

    @Autowired
    private VisionRepo repo;

    public List<Vision> getAllVisions() {
        return repo.findByArchived(false);
    }

    public List<Vision> getArchivedVisions() {
        return repo.findByArchived(true);
    }

    public Vision getVisionById(int id) {
        Optional<Vision> vision = repo.findById(id);
        return vision.orElse(null);
    }

    public Vision addVision(Vision vision, MultipartFile imageFile) throws IOException {
        vision.setImageName(imageFile.getOriginalFilename());
        vision.setImageType(imageFile.getContentType());
        vision.setImageData(imageFile.getBytes());
        vision.setArchived(false);
        return repo.save(vision);
    }

    public Vision updateVision(int id, Vision updatedVision, MultipartFile imageFile) throws IOException {
        Vision existing = getVisionById(id);
        if (existing == null) return null;

        existing.setTitle(updatedVision.getTitle());
        existing.setAffirmation(updatedVision.getAffirmation());
        existing.setPriority(updatedVision.getPriority());
        existing.setDeadline(updatedVision.getDeadline());

        if (imageFile != null && !imageFile.isEmpty()) {
            existing.setImageName(imageFile.getOriginalFilename());
            existing.setImageType(imageFile.getContentType());
            existing.setImageData(imageFile.getBytes());
        }

        return repo.save(existing);
    }

    public boolean markAsAchieved(int id) {
        Vision vision = getVisionById(id);
        if (vision == null) return false;
        vision.setArchived(true);
        repo.save(vision);
        return true;
    }

    public void deleteVision(int id) {
        repo.deleteById(id);
    }

    public List<Vision> printAllVisions() {
        return repo.findAll(); // Don't filter by archived = false
    }

}

