package com.bellLabs.bellLabs_api.models.user;

public class UserGroceryItem {

    private int userGroceryItemId;
    private int userId;

    private int groceryItemId;

    private int quantity;

    private int unit;

    private int expirationDate;

    //Getters and Setters


    public int getUserGroceryItemId() {
        return userGroceryItemId;
    }

    public void setUserGroceryItemId(int userGroceryItemId) {
        this.userGroceryItemId = userGroceryItemId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public int getUnit() {
        return unit;
    }

    public void setUnit(int unit) {
        this.unit = unit;
    }

    public int getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(int expirationDate) {
        this.expirationDate = expirationDate;
    }
}
