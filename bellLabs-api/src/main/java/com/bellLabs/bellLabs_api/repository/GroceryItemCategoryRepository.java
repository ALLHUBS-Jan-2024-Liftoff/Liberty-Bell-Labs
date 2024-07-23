package com.bellLabs.bellLabs_api.repository;

import com.bellLabs.bellLabs_api.models.GroceryItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroceryItemCategoryRepository extends JpaRepository<GroceryItemCategory, Integer> {
}
