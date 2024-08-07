package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.models.GroceryItem;
import com.bellLabs.bellLabs_api.repository.GroceryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/items")
@CrossOrigin(origins = "http://localhost:5173")

public class GroceryItemController {

    @Autowired
    private GroceryItemRepository groceryItemRepository;

    @GetMapping
    public List<GroceryItem> getAllGroceryItems(){
        return groceryItemRepository.findAll();
    }
}
