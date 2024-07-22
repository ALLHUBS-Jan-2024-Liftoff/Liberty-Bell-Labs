package com.bellLabs.bellLabs_api.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class GroceryItem {
    @Id
    @GeneratedValue
    private int groceryItemId;
    private String name;
    private int categoryId;
    private int nutritionInfoId;
    private int quantity;

    private String unit;

    //private String expiration date?(would this be a string?)

    //Getters and Setters


    public int getGroceryItemId() {
        return groceryItemId;
    }

    public void setGroceryItemId(int groceryItemId) {
        this.groceryItemId = groceryItemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getNutritionInfoId() {
        return nutritionInfoId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public void setNutritionInfoId(int nutritionInfoId) {
        this.nutritionInfoId = nutritionInfoId;


    }
}
