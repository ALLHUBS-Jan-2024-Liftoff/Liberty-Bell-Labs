package com.bellLabs.bellLabs_api.controllers;

import com.bellLabs.bellLabs_api.models.ShoppingList;
import com.bellLabs.bellLabs_api.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shoppinglists")
public class ShoppingListController {
    @Autowired
    private ShoppingListRepository shoppingListRepository;

    //find all shopping lists

    @GetMapping
    public List<ShoppingList> getAllShoppingLists(){
        return shoppingListRepository.findAll();
    }

    public ShoppingList createShoppingList(@RequestBody ShoppingList shoppingList) {
        return shoppingListRepository.save(shoppingList);
    }
}
