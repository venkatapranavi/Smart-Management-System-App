package com.MyApp.DoctorConsultantApp.repository;

import com.MyApp.DoctorConsultantApp.model.Appointment;
import com.MyApp.DoctorConsultantApp.model.Doctor;
import com.MyApp.DoctorConsultantApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByUser(User user);
    boolean existsByDoctorAndDateAndTime(Doctor doctor, LocalDate date, LocalTime time);
    long countByDate(LocalDate date);
}
