package com.MyApp.DoctorConsultantApp.service;

import com.MyApp.DoctorConsultantApp.model.Appointment;
import com.MyApp.DoctorConsultantApp.model.Payment;
import com.MyApp.DoctorConsultantApp.repository.AppointmentRepository;
import com.MyApp.DoctorConsultantApp.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private NotificationService notificationService;

    public Payment makePayment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (appointment.getStatus() != Appointment.AppointmentStatus.APPROVED) {
            throw new IllegalStateException("Payment allowed only for approved appointments.");
        }

        if (appointment.isPaid()) {
            throw new IllegalStateException("Appointment is already paid.");
        }

        // Update appointment
        appointment.setPaid(true);
        appointmentRepository.save(appointment);

        // Save payment record
        Payment payment = new Payment();
        payment.setAppointmentId(appointmentId);
        payment.setUserId(appointment.getUser().getId());
        payment.setAmount(500.0); // Fixed amount or dynamic
        payment.setStatus("SUCCESS");
        payment.setTimestamp(LocalDateTime.now());
        paymentRepository.save(payment);

        // Notify user
        notificationService.sendNotification("Payment successful for your appointment.", "USER", appointment.getUser().getId());

        return payment;
    }
}
