package com.MyApp.DoctorConsultantApp.service;

import com.MyApp.DoctorConsultantApp.model.Notification;
import com.MyApp.DoctorConsultantApp.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public void sendNotification(String message, String recipientType, Long recipientId) {
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setRecipientType(recipientType);
        notification.setRecipientId(recipientId);
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }

    public List<Notification> getNotifications(String recipientType, Long recipientId, Boolean unreadOnly) {
        if (unreadOnly != null && unreadOnly) {
            return notificationRepository.findByRecipientTypeAndRecipientIdAndReadOrderByCreatedAtDesc(recipientType, recipientId, false);
        } else {
            return notificationRepository.findByRecipientTypeAndRecipientIdOrderByCreatedAtDesc(recipientType, recipientId);
        }
    }

    public Notification markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }
}
