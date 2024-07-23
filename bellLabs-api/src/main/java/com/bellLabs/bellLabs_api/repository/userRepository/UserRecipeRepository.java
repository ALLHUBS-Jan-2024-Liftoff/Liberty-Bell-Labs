package com.bellLabs.bellLabs_api.repository.userRepository;

import com.bellLabs.bellLabs_api.models.user.UserRecipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRecipeRepository extends JpaRepository<UserRecipe, Integer>{
}
