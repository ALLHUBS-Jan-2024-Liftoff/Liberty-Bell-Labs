package com.bellLabs.bellLabs_api.repository;

import com.bellLabs.bellLabs_api.models.ShoppingListItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingListItemRepository extends JpaRepository<ShoppingListItem, Integer> {
}
