package com.civicpulse.repository;

import com.civicpulse.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    Optional<Complaint> findByComplaintId(String complaintId);
    Optional<Complaint> findByComplaintIdIgnoreCase(String complaintId);
}
