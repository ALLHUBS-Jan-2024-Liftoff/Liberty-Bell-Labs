package com.bellLabs.bellLabs_api.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class ShoppingList {
    @Id
    @GeneratedValue
    private int shoppingListId;

    private int userId;

    private String listName;

    //Getters & Setters


    public int getShoppingListId() {
        return shoppingListId;
    }

    public void setShoppingListId(int shoppingListId) {
        this.shoppingListId = shoppingListId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }
}
