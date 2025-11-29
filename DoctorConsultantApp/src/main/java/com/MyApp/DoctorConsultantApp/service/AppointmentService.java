package com.MyApp.DoctorConsultantApp.service;

import com.MyApp.DoctorConsultantApp.model.Appointment;
import com.MyApp.DoctorConsultantApp.model.Doctor;
import com.MyApp.DoctorConsultantApp.model.User;
import com.MyApp.DoctorConsultantApp.repository.AppointmentRepository;
import com.MyApp.DoctorConsultantApp.repository.DoctorRepository;
import com.MyApp.DoctorConsultantApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    public Appointment bookAppointment(Long userId, Long doctorId, LocalDate date, LocalTime time) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        if (appointmentRepository.existsByDoctorAndDateAndTime(doctor, date, time)) {
            throw new RuntimeException("Slot already booked. Choose a different time.");
        }

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setDoctor(doctor);
        appointment.setDate(date);
        appointment.setTime(time);
        appointment.setStatus(Appointment.AppointmentStatus.PENDING);
        appointmentRepository.save(appointment);

        notificationService.sendNotification("New appointment requested.", "DOCTOR", doctor.getId());
        notificationService.sendNotification("Appointment requested successfully.", "USER", user.getId());

        return appointment;
    }

    public List<Appointment> getDoctorAppointments(Long doctorId) {
        return appointmentRepository.findByDoctor(doctorRepository.findById(doctorId).orElseThrow());
    }

    public List<Appointment> getUserAppointments(Long userId) {
        return appointmentRepository.findByUser(userRepository.findById(userId).orElseThrow());
    }

    public Appointment approveAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(Appointment.AppointmentStatus.APPROVED);
        appointmentRepository.save(appointment);

        notificationService.sendNotification("Your appointment has been approved.", "USER", appointment.getUser().getId());

        return appointment;
    }

    public Appointment completeAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (appointment.getStatus() != Appointment.AppointmentStatus.APPROVED) {
            throw new IllegalStateException("Only approved appointments can be completed.");
        }

        if (!appointment.isPaid()) {
            throw new IllegalStateException("Cannot complete appointment before payment.");
        }

        appointment.setStatus(Appointment.AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);

        return appointment;
    }
}
