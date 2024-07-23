package com.bellLabs.bellLabs_api.controllers.usercontrollers;

import com.bellLabs.bellLabs_api.repository.userRepository.UserRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserRecipeController {

    @Autowired
    private UserRecipeRepository userRecipeRepository;
}
