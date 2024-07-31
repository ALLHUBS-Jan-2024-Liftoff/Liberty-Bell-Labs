package com.bellLabs.bellLabs_api.controllers.usercontrollers;

import com.bellLabs.bellLabs_api.models.user.User;
import com.bellLabs.bellLabs_api.repository.userRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

   @GetMapping("/users")
    Iterable<User> getAllUsers(){
        return userRepository.findAll();
        }

}
