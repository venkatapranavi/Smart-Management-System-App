package com.MyApp.DoctorConsultantApp.service;

import com.MyApp.DoctorConsultantApp.dto.*;
import com.MyApp.DoctorConsultantApp.model.User;
import com.MyApp.DoctorConsultantApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
        }

        User user = new User();
        user.setFullName(request.fullName);
        user.setEmail(request.email);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setPhone(request.phone);
        user.setGender(request.gender);
        user.setAge(request.age);
        user.setHeight(request.height);
        user.setWeight(request.weight);
        user.setBloodGroup(request.bloodGroup);
        user.setAboutMe(request.aboutMe);
        user.setPremium(false); // default, or from request
        user.setRole(Role.USER); // default user role

        User savedUser = userRepository.save(user);

        RegisterResponse response = new RegisterResponse();
        response.setId(savedUser.getId());
        response.setFullName(savedUser.getFullName());
        response.setEmail(savedUser.getEmail());
        response.setPhone(savedUser.getPhone());
        response.setGender(savedUser.getGender());
        response.setAge(savedUser.getAge());
        response.setHeight(savedUser.getHeight());
        response.setWeight(savedUser.getWeight());
        response.setBloodGroup(savedUser.getBloodGroup());
        response.setAboutMe(savedUser.getAboutMe());
        response.setPremium(savedUser.isPremium());
        response.setRole(Role.valueOf(savedUser.getRole().name()));

        return response;
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                "N/A"
        );
    }

    public User getProfile(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public void updateUserProfile(Long userId, UpdateUserProfileRequest req) {
        User user = getProfile(userId);
        user.setFullName(req.fullName);
        user.setEmail(req.email);
        user.setPhone(req.phone);
        user.setGender(req.gender);
        user.setAge(req.age);
        user.setHeight(req.height);
        user.setWeight(req.weight);
        user.setBloodGroup(req.bloodGroup);
        user.setAboutMe(req.aboutMe);
        userRepository.save(user);
    }

    public void changeUserPassword(Long userId, ChangePasswordRequest req) {
        User user = getProfile(userId);

        if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Old password is incorrect");
        }

        String hashedPassword = passwordEncoder.encode(req.getNewPassword());
        user.setPassword(hashedPassword);

        userRepository.save(user);
    }
}
