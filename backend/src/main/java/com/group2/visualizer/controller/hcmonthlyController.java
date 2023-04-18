package com.group2.visualizer.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import com.group2.visualizer.model.hcmonthly;
import com.group2.visualizer.model.hcmonthlyRepository;

@RestController
@RequestMapping("/api/hcmonthly")
public class hcmonthlyController {

    @Autowired
    private hcmonthlyRepository hcmonthlyRepository;

    // GET /api/hcmonthly
    @GetMapping("")
    public List<hcmonthly> getAllHcMonthly() {
        return hcmonthlyRepository.findAll();
    }
}