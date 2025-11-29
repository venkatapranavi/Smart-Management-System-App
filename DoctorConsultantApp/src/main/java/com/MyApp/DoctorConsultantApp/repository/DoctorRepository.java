package com.MyApp.DoctorConsultantApp.repository;

import com.MyApp.DoctorConsultantApp.dto.ApprovalStatus;
import com.MyApp.DoctorConsultantApp.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);
    List<Doctor> findBySpecializationAndStatus(String specialization, ApprovalStatus status);
    long countByStatus(ApprovalStatus status);
    List<Doctor> findByStatus(ApprovalStatus status);
}
