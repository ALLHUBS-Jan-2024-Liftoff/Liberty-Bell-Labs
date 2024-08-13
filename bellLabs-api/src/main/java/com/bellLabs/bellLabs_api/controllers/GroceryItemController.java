package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.models.GroceryItem;
import com.bellLabs.bellLabs_api.repository.GroceryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class GroceryItemController {

    @Autowired
    GroceryItemRepository groceryItemRepository;

    @GetMapping("/items")
    public ResponseEntity<List<GroceryItem>> getAllGroceryItems(){
        try {
            List<GroceryItem> groceryItems = groceryItemRepository.findAll();
            return new ResponseEntity<>(groceryItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(List.of(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/items")
    public ResponseEntity<GroceryItem> createGroceryItem(@RequestBody GroceryItem groceryItem) {
        try {
            GroceryItem newGroceryItem = groceryItemRepository.save(new GroceryItem(groceryItem.getName(), groceryItem.getQuantity(), groceryItem.getUnit()));
            return new ResponseEntity<>(newGroceryItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/test-db")
    public ResponseEntity<String> testDatabaseConnection() {
        try {
            GroceryItem testItem = new GroceryItem("Test Item", 1, "unit");
            groceryItemRepository.save(testItem);
            return new ResponseEntity<>("Database connection is successful and test item inserted.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Database connection failed.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
