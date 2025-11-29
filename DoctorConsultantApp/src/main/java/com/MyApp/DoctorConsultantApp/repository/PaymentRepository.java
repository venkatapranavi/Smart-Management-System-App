package com.MyApp.DoctorConsultantApp.repository;

import com.MyApp.DoctorConsultantApp.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT SUM(p.amount) FROM Payment p")
    Double sumTotalAmount();
}
