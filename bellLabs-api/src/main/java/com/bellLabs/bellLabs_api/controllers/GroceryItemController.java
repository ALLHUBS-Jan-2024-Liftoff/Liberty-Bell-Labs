package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.models.GroceryItem;
import com.bellLabs.bellLabs_api.repository.GroceryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class GroceryItemController {

    @Autowired
    private GroceryItemRepository groceryItemRepository;

    @GetMapping
    public List<GroceryItem> getAllGroceryItems(){
        return groceryItemRepository.findAll();
    }
}
