package com.bellLabs.bellLabs_api.models.user;

public class UserRecipe {

private int userRecipeId;
private int userId;

private int recipeId;

private String name;

//Getters and Setters

    public int getUserRecipeId() {
        return userRecipeId;
    }

    public void setUserRecipeId(int userRecipeId) {
        this.userRecipeId = userRecipeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
