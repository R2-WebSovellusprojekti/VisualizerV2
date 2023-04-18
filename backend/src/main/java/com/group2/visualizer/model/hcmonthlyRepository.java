package com.group2.visualizer.model;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface hcmonthlyRepository extends JpaRepository<hcmonthly, Long> {
    List<hcmonthly> findAllByOrderByYearAsc();
}