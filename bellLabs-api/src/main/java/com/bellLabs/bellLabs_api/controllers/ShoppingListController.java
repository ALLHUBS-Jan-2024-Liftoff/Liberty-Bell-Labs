package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ShoppingListController {
    @Autowired
    private ShoppingListRepository shoppingListRepository;
}
