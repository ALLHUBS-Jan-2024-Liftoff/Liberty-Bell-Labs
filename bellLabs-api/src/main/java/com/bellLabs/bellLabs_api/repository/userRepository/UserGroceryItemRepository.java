package com.bellLabs.bellLabs_api.repository.userRepository;

import com.bellLabs.bellLabs_api.models.user.UserGroceryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroceryItemRepository extends JpaRepository<UserGroceryItem, Integer> {
}
