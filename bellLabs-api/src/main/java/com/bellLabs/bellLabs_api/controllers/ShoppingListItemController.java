package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.repository.ShoppingListItemRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ShoppingListItemController {
    @Autowired
    private ShoppingListItemRepository shoppingListItemRepository;
}
