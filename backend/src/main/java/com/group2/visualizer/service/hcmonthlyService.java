package com.group2.visualizer.service;

import java.util.List;
import com.group2.visualizer.model.hcmonthly;
import com.group2.visualizer.model.hcmonthlyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class hcmonthlyService {
    @Autowired
    private hcmonthlyRepository hcmonthlyRepo;

    public List<hcmonthly> getAllMonthlyData() {
        return hcmonthlyRepo.findAllByOrderByYearAsc();
    }
}
