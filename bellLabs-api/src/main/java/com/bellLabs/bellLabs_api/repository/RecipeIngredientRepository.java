package com.bellLabs.bellLabs_api.repository;

import com.bellLabs.bellLabs_api.models.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeIngredientRepository extends JpaRepository <RecipeIngredient, Integer> {
}
