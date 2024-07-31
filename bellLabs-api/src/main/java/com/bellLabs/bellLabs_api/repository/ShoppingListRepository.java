package com.bellLabs.bellLabs_api.repository;

import com.bellLabs.bellLabs_api.models.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingListRepository extends JpaRepository<ShoppingList, Integer> {
}
