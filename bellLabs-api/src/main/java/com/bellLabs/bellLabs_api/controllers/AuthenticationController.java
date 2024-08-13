package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.models.dto.LoginFormDTO;
import com.bellLabs.bellLabs_api.models.dto.RegisterFormDTO;
import com.bellLabs.bellLabs_api.models.user.User;
import com.bellLabs.bellLabs_api.repository.userRepository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class AuthenticationController {
    @Autowired
    UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);
        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

//    @GetMapping("/register")
//    public String displayRegistrationForm(Model model) {
//        model.addAttribute(new RegisterFormDTO());
//        model.addAttribute("title", "Register");
//        return "register";
//    }

    @PostMapping("/register" )
    public ResponseEntity<Map> processRegistrationForm(@RequestBody RegisterFormDTO registerFormDTO,
                                                       HttpServletRequest request)  {
        ResponseEntity response = null;
        Map<String, String> responseBody = new HashMap<>();
        try{
            User existingUser = userRepository.findByUsername(registerFormDTO.getUsername());
            if (existingUser == null && !registerFormDTO.getUsername().isEmpty() && !registerFormDTO.getPassword().isEmpty() && !registerFormDTO.getVerifyPassword().isEmpty() && registerFormDTO.getPassword().equals(registerFormDTO.getVerifyPassword())){
                responseBody.put("message", "Given user details are successfully registered");
                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(responseBody);
                User newUser = new User(registerFormDTO.getUsername(), registerFormDTO.getPassword());
                setUserInSession(request.getSession(), newUser);
                userRepository.save(newUser);
            } else if(existingUser != null) {
                responseBody.put("message", "User Already Exists.");
                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            } else if(registerFormDTO.getUsername().isEmpty()) {
                responseBody.put("message", "Username required.");
                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            } else if (registerFormDTO.getPassword().isEmpty()) {
                responseBody.put("message", "Password required");
                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            } else if (registerFormDTO.getVerifyPassword().isEmpty()) {
                responseBody.put("message", "Please verify password");
                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            } else if (!registerFormDTO.getPassword().equals(registerFormDTO.getVerifyPassword())) {
                responseBody.put("message", "Password mismatch");
                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(responseBody);
            }
        }catch (Exception ex){
            responseBody.put("message", "An exception occurred due to " + ex.getMessage());
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(responseBody);
        }
        return response;
    }


//    @PostMapping("/register")
//    public String processRegistrationForm(@ModelAttribute @Valid RegisterFormDTO registerFormDTO,
//                                          Errors errors, HttpServletRequest request,
//                                          Model model) {
//
//        if (errors.hasErrors()) {
//            model.addAttribute("title", "Register");
//            return "register";
//        }
//
//        User existingUser = userRepository.findByUsername(registerFormDTO.getUsername());
//
//        if (existingUser != null) {
//            errors.rejectValue("username", "username.alreadyexists", "A user with that username already exists");
//            model.addAttribute("title", "Register");
//            return "register";
//        }
//
//        String password = registerFormDTO.getPassword();
//        String verifyPassword = registerFormDTO.getVerifyPassword();
//        if (!password.equals(verifyPassword)) {
//            errors.rejectValue("password", "passwords.mismatch", "Passwords do not match");
//            model.addAttribute("title", "Register");
//            return "register";
//        }
//
//        User newUser = new User(registerFormDTO.getUsername(), registerFormDTO.getPassword());
//        userRepository.save(newUser);
//        setUserInSession(request.getSession(), newUser);
//
//        return "redirect:";
//    }
//
//    @GetMapping("/login")
//    public String displayLoginForm(Model model) {
//        model.addAttribute(new LoginFormDTO());
//        model.addAttribute("title", "Log In");
//        return "login";
//    }

    @PostMapping("/login")
    public ResponseEntity<Map> processLoginForm(@RequestBody LoginFormDTO loginFormDTO, HttpServletRequest request) {

        ResponseEntity response = null;
        Map<String, String> responseBody = new HashMap<>();
        User theUser = userRepository.findByUsername(loginFormDTO.getUsername());
        String password = loginFormDTO.getPassword();
        if (theUser == null) {
            responseBody.put("message", "Username does not exist");
            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(responseBody);
        }else if (!theUser.isMatchingPassword(password)) {
            responseBody.put("message", "Incorrect Password");
            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(responseBody);
        } else {
            setUserInSession(request.getSession(), theUser);
            responseBody.put("message", "User successfully logged in.");
            responseBody.put("username", theUser.getUsername());
            response = ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(responseBody);
        }
        return response;
    }

//    @PostMapping("/login")
//    public String processLoginForm(@ModelAttribute @Valid LoginFormDTO loginFormDTO,
//                                   Errors errors, HttpServletRequest request,
//                                   Model model) {
//
//        if (errors.hasErrors()) {
//            model.addAttribute("title", "Log In");
//            return "login";
//        }
//
//        User theUser = userRepository.findByUsername(loginFormDTO.getUsername());
//
//        if (theUser == null) {
//            errors.rejectValue("username", "user.invalid", "The given username does not exist");
//            model.addAttribute("title", "Log In");
//            return "login";
//        }
//
//        String password = loginFormDTO.getPassword();
//
//        if (!theUser.isMatchingPassword(password)) {
//            errors.rejectValue("password", "password.invalid", "Invalid password");
//            model.addAttribute("title", "Log In");
//            return "login";
//        }
//
//        setUserInSession(request.getSession(), theUser);
//
//        return "redirect:";
//    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        request.getSession().invalidate();
        return "redirect:/login";
    }

}
