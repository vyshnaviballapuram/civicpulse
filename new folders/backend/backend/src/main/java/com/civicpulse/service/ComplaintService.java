package com.civicpulse.service;

import com.civicpulse.model.Complaint;
import com.civicpulse.model.ComplaintStatus;
import com.civicpulse.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Random;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    @Autowired
    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public Optional<Complaint> getComplaintByComplaintId(String complaintId) {
        if (complaintId == null || complaintId.trim().isEmpty()) {
            return Optional.empty();
        }
        return complaintRepository.findByComplaintIdIgnoreCase(complaintId.trim());
    }

    public Complaint createComplaint(Complaint complaint) {
        // Generate unique complaint ID if not provided
        if (complaint.getComplaintId() == null || complaint.getComplaintId().trim().isEmpty()) {
            String newId;
            do {
                int randomNum = 1000 + new Random().nextInt(9000);
                newId = "CP-" + randomNum;
            } while (complaintRepository.findByComplaintIdIgnoreCase(newId).isPresent());
            complaint.setComplaintId(newId);
        }

        // Set default initial values
        if (complaint.getStatus() == null) {
            complaint.setStatus(ComplaintStatus.PENDING);
        }
        if (complaint.getCitizenId() == null || complaint.getCitizenId().trim().isEmpty()) {
            complaint.setCitizenId("CIT-" + (1000 + new Random().nextInt(9000)));
        }
        if (complaint.getSubmittedDate() == null || complaint.getSubmittedDate().trim().isEmpty()) {
            complaint.setSubmittedDate(LocalDate.now().toString());
        }
        if (complaint.getAssignedOfficer() == null || complaint.getAssignedOfficer().trim().isEmpty()) {
            complaint.setAssignedOfficer("Unassigned (Pending Routing)");
        }
        if (complaint.getDepartment() == null || complaint.getDepartment().trim().isEmpty()) {
            complaint.setDepartment(getDepartmentByCategory(complaint.getCategory()));
        }

        return complaintRepository.save(complaint);
    }

    private String getDepartmentByCategory(String category) {
        if (category == null) return "General Municipal Services";
        String catLower = category.toLowerCase();
        if (catLower.contains("road")) {
            return "Roads & Traffic Engineering Dept";
        } else if (catLower.contains("water")) {
            return "Water Supply & Sanitation Department";
        } else if (catLower.contains("electr")) {
            return "Electrical Works Department";
        } else if (catLower.contains("sanitat") || catLower.contains("garb")) {
            return "Municipal Solid Waste Division";
        } else {
            return "General Civic Grievances Dept";
        }
    }
}
