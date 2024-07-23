package com.bellLabs.bellLabs_api.repository;

import com.bellLabs.bellLabs_api.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

}
