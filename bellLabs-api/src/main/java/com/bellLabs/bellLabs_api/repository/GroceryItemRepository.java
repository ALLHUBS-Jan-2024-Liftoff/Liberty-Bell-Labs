package com.bellLabs.bellLabs_api.repository;

import com.bellLabs.bellLabs_api.models.GroceryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroceryItemRepository extends JpaRepository<GroceryItem, Integer> {

}
