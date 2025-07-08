package com.shruti.visionboard.repo;

import com.shruti.visionboard.model.Vision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisionRepo extends JpaRepository<Vision, Integer> {

    List<Vision> findByArchived(boolean archived);
}
