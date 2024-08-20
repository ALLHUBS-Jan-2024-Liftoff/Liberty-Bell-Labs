package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.models.GroceryItem;
import com.bellLabs.bellLabs_api.models.ShoppingList;
import com.bellLabs.bellLabs_api.repository.GroceryItemRepository;
import com.bellLabs.bellLabs_api.repository.ShoppingListItemRepository;
import com.bellLabs.bellLabs_api.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shoppinglists")
public class ShoppingListController {
    @Autowired
    private ShoppingListRepository shoppingListRepository;
    @Autowired
    private GroceryItemRepository groceryItemRepository;
    @Autowired
    private ShoppingListItemRepository shoppingListItemRepository;

    //find all shopping lists

    @GetMapping
    public List<ShoppingList> getAllShoppingLists() {
        return shoppingListRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ShoppingList> createShoppingList(@RequestBody ShoppingList shoppingList) {
        try {
            ShoppingList newShoppingList = shoppingListRepository.save(new ShoppingList(shoppingList.getListName()));
            return new ResponseEntity<>(newShoppingList, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    // find all GroceryItems with that ShoppingList

    @GetMapping("/shoppinglists/{shoppingListId}/items")
    public ResponseEntity<List<GroceryItem>> getItemsForShoppingList(@PathVariable int shoppingListId) {
        // find the ShoppingList by its ID
        ShoppingList shoppingList = shoppingListRepository.findById((int) shoppingListId).orElse(null);

        if (shoppingList == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<GroceryItem> items = groceryItemRepository.findByShoppingList(shoppingList);
        return ResponseEntity.ok(items);
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