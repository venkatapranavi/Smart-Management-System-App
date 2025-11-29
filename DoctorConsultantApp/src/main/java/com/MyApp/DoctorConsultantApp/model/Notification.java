package com.MyApp.DoctorConsultantApp.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private String recipientType;
    private Long recipientId;

    private LocalDateTime createdAt;
    private boolean read = false;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getRecipientType() {
        return recipientType;
    }
    public void setRecipientType(String recipientType) {
        this.recipientType = recipientType;
    }

    public Long getRecipientId() {
        return recipientId;
    }
    public void setRecipientId(Long recipientId) {
        this.recipientId = recipientId;
    }

    public boolean isRead() {
        return read;
    }
    public void setRead(boolean read) {
        this.read = read;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", recipientType='" + recipientType + '\'' +
                ", recipientId=" + recipientId +
                ", createdAt=" + createdAt +
                ", read=" + read +
                '}';
    }
}
