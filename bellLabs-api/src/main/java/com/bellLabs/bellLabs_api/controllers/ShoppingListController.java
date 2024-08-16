package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.models.GroceryItem;
import com.bellLabs.bellLabs_api.models.ShoppingList;
import com.bellLabs.bellLabs_api.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shoppinglists")
public class ShoppingListController {
    @Autowired
    private ShoppingListRepository shoppingListRepository;

    //find all shopping lists

    @GetMapping
    public List<ShoppingList> getAllShoppingLists() {
        return shoppingListRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ShoppingList> createShoppingList(@RequestBody ShoppingList shoppingList) {
        try {
            ShoppingList newShoppingList = shoppingListRepository.save(shoppingList);
            return new ResponseEntity<>(newShoppingList, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }
}




//@PostMapping("/items")
//public ResponseEntity<GroceryItem> createGroceryItem(@RequestBody GroceryItem groceryItem) {
//    try {
//
//        GroceryItem newGroceryItem = groceryItemRepository.save(new GroceryItem(groceryItem.getName(), groceryItem.getQuantity(), groceryItem.getUnit(), groceryItem.getExpirationDate()));
//
//        return new ResponseEntity<>(newGroceryItem, HttpStatus.CREATED);
//    } catch (Exception e) {
//        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//}