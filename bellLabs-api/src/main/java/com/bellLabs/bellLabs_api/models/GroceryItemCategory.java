package com.bellLabs.bellLabs_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class GroceryItemCategory {
    @Id
    @GeneratedValue
    private int groceryItemCatId;
    private String name;

    //Getters and Setters


    public int getGroceryItemCatId() {
        return groceryItemCatId;
    }

    public void setGroceryItemCatId(int groceryItemCatId) {
        this.groceryItemCatId = groceryItemCatId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
