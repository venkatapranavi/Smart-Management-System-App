package com.MyApp.DoctorConsultantApp.service;

import com.MyApp.DoctorConsultantApp.dto.*;
import com.MyApp.DoctorConsultantApp.model.Doctor;
import com.MyApp.DoctorConsultantApp.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Doctor register(DoctorRegisterRequest request) {
        if (doctorRepository.findByEmail(request.email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        Doctor doctor = new Doctor();
        doctor.setFullName(request.fullName);
        doctor.setEmail(request.email);
        doctor.setPassword(passwordEncoder.encode(request.password));
        doctor.setGender(request.gender);
        doctor.setSpecialization(request.specialization);
        doctor.setQualification(request.qualification);
        doctor.setBio(request.bio);
        doctor.setFees(request.fees);
        doctor.setRating(request.rating);
        doctor.setTags(request.tags);
        doctor.setSchedules(request.schedules);

        return doctorRepository.save(doctor);
    }

    public LoginResponse doctorLogin(LoginRequest request) {
        Doctor doctor = doctorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!passwordEncoder.matches(request.getPassword(), doctor.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        if (doctor.getStatus() != ApprovalStatus.APPROVED) {
            throw new RuntimeException("Doctor not approved by admin");
        }

        return new LoginResponse(
                doctor.getId(),
                doctor.getFullName(),
                doctor.getEmail(),
                doctor.getRole().name(),
                doctor.getStatus().name()
        );
    }

    public List<Doctor> findBySpecialization(String specialization) {
        return doctorRepository.findBySpecializationAndStatus(specialization, ApprovalStatus.APPROVED);
    }

    public Doctor getProfile(Long id) {
        return doctorRepository.findById(id).orElseThrow();
    }
}
