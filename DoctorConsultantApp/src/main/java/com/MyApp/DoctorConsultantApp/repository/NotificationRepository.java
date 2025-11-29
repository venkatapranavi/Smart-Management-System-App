package com.MyApp.DoctorConsultantApp.repository;

import com.MyApp.DoctorConsultantApp.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipientTypeAndRecipientIdOrderByCreatedAtDesc(String recipientType, Long recipientId);
    List<Notification> findByRecipientTypeAndRecipientIdAndReadOrderByCreatedAtDesc(String recipientType, Long recipientId, boolean read);

}
