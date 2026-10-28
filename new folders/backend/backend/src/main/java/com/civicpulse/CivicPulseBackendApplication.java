package com.civicpulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CivicPulseBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CivicPulseBackendApplication.class, args);
        System.out.println("\n=======================================================");
        System.out.println("  CivicPulse Backend REST API Running on port 8081");
        System.out.println("  H2 Console: http://localhost:8081/h2-console");
        System.out.println("  Track Complaint Endpoint: GET /api/complaints/{complaintId}");
        System.out.println("=======================================================\n");
    }
}
