package com.bellLabs.bellLabs_api.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class NutritionalInfo {

    @Id
    @GeneratedValue
   private int nutritionInfoId;
   private int calories;

   private double protein;
   private double carbs;
   private double fats;

    public int getNutritionInfoId() {
        return nutritionInfoId;
    }

    public void setNutritionInfoId(int nutritionInfoId) {
        this.nutritionInfoId = nutritionInfoId;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getFats() {
        return fats;
    }

    public void setFats(double fats) {
        this.fats = fats;
    }
}
