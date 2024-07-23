package com.bellLabs.bellLabs_api.controllers.usercontrollers;

import com.bellLabs.bellLabs_api.repository.userRepository.UserGroceryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserGroceryItemController {

    @Autowired
    private UserGroceryItemRepository userGroceryItemRepository;
}
