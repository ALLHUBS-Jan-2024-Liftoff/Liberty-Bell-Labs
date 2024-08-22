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
//    @Autowired
//    private GroceryItemRepository groceryItemRepository;
    @Autowired
    private ShoppingListItemRepository shoppingListItemRepository;

    //find all shopping lists

    @GetMapping
    public List<ShoppingList> getAllShoppingLists() {
        return shoppingListRepository.findAll();
    }

    public ResponseEntity<ShoppingList> getShoppingListById(@PathVariable int shoppingListId) {
        Optional<ShoppingList> shoppingList = shoppingListRepository.findById(shoppingListId);
        return shoppingList.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
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

    @PutMapping("{shoppingListId}")
public ResponseEntity<ShoppingList> updateShoppingList(@PathVariable int shoppingListId, @RequestBody ShoppingList shoppingListDetails) {
        Optional<ShoppingList> shoppingListOptional = shoppingListRepository.findById(shoppingListId);

        if(shoppingListOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ShoppingList shoppingList = shoppingListOptional.get();
        shoppingList.setListName(shoppingListDetails.getListName());

        ShoppingList updatedShoppingList = shoppingListRepository.save(shoppingList);
        return ResponseEntity.ok(updatedShoppingList);
}

    @DeleteMapping("/{shoppingListId}")
    public ResponseEntity<Void> deleteShoppingList(@PathVariable int shoppingListId) {
        shoppingListRepository.deleteById(shoppingListId);
        return ResponseEntity.noContent().build();
    }




}


