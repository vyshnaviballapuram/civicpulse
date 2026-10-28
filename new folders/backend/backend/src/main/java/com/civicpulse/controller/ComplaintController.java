package com.civicpulse.controller;

import com.civicpulse.model.Complaint;
import com.civicpulse.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    private final ComplaintService complaintService;

    @Autowired
    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @GetMapping("/{complaintId}")
    public ResponseEntity<?> getComplaintById(@PathVariable String complaintId) {
        if (complaintId == null || complaintId.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Complaint ID cannot be empty.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        Optional<Complaint> complaintOptional = complaintService.getComplaintByComplaintId(complaintId);

        if (complaintOptional.isPresent()) {
            return ResponseEntity.ok(complaintOptional.get());
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Complaint not found. Please check the Complaint ID and try again.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @PostMapping
    public ResponseEntity<?> createComplaint(@RequestBody Complaint complaint) {
        if (complaint.getTitle() == null || complaint.getTitle().trim().isEmpty() ||
            complaint.getDescription() == null || complaint.getDescription().trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Title and description are required.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        Complaint savedComplaint = complaintService.createComplaint(complaint);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComplaint);
    }
}
