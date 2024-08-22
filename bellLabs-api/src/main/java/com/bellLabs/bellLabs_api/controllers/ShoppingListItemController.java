package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.models.GroceryItem;
import com.bellLabs.bellLabs_api.models.ShoppingListItem;
import com.bellLabs.bellLabs_api.repository.ShoppingListItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shoppinglistitems")
public class ShoppingListItemController {
    @Autowired
    private ShoppingListItemRepository shoppingListItemRepository;

    @GetMapping("/items")
    public ResponseEntity<List<ShoppingListItem>> getAllShoppingListItems() {
        try {
            List<ShoppingListItem> shoppingListItems = shoppingListItemRepository.findAll();
            return new ResponseEntity<>(shoppingListItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(List.of(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/items")
    public ResponseEntity<ShoppingListItem> createShoppingListItem(@RequestBody ShoppingListItem shoppingListItem) {
        try {

            ShoppingListItem newShoppingListItem = shoppingListItemRepository.save(new ShoppingListItem(shoppingListItem.getItemName(), shoppingListItem.getQuantity(), shoppingListItem.getUnit()));
            return new ResponseEntity<>(newShoppingListItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/items/{shoppingListItemId}")
    public ResponseEntity<HttpStatus> deleteShoppingListItem(@PathVariable("shoppingListItemId") int shoppingListItemId) {
        try {
            shoppingListItemRepository.deleteById(shoppingListItemId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/items/{shoppingListItemId}")
    public ResponseEntity<ShoppingListItem> updateShoppingListItem(@PathVariable("shoppingListItemId") int shoppingListItemId, @RequestBody ShoppingListItem shoppingListItem) {
        try {
            Optional<ShoppingListItem> shoppingListItemData = shoppingListItemRepository.findById(shoppingListItemId);

            if (shoppingListItemData.isPresent()) {
                ShoppingListItem _shoppingListItem = shoppingListItemData.get();
                _shoppingListItem.setItemName(shoppingListItem.getItemName());
                _shoppingListItem.setQuantity(shoppingListItem.getQuantity());
                return new ResponseEntity<>(shoppingListItemRepository.save(_shoppingListItem), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

