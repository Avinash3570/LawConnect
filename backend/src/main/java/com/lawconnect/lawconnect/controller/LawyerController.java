package com.lawconnect.lawconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.lawconnect.lawconnect.model.Lawyer;
import com.lawconnect.lawconnect.repository.LawyerRepository;
import java.util.List;

@RestController
@RequestMapping("/api/lawyers")
public class LawyerController {

    @Autowired
    private LawyerRepository lawyerRepository;

    @GetMapping
    public List<Lawyer> getAllLawyers() {
        return lawyerRepository.findAll();
    }
}
