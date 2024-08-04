package com.bellLabs.bellLabs_api.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class ShoppingListItem {

    @Id
    @GeneratedValue
    private int shoppingListItemId;
    private int shoppingListId;
    private int groceryItemId;
    private int quantity;


    //Getters & Setters
    public int getShoppingListItemId() {
        return shoppingListItemId;
    }

    public void setShoppingListItemId(int shoppingListItemId) {
        this.shoppingListItemId = shoppingListItemId;
    }

    public int getShoppingListId() {
        return shoppingListId;
    }

    public void setShoppingListId(int shoppingListId) {
        this.shoppingListId = shoppingListId;
    }

    public int getGroceryItemId() {
        return groceryItemId;
    }

    public void setGroceryItemId(int groceryItemId) {
        this.groceryItemId = groceryItemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
