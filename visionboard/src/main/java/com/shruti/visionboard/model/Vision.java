package com.shruti.visionboard.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String affirmation;
    private String priority;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate deadline;

    private boolean archived = false;

    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAffirmation() {
        return affirmation;
    }

    public String getPriority() {
        return priority;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public boolean isArchived() {
        return archived;
    }

    public String getImageName() {
        return imageName;
    }

    public String getImageType() {
        return imageType;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAffirmation(String affirmation) {
        this.affirmation = affirmation;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }


    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}
