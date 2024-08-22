package com.bellLabs.bellLabs_api.repository;

import com.bellLabs.bellLabs_api.models.GroceryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface GroceryItemRepository extends JpaRepository<GroceryItem, Long> {
    List<GroceryItem> findByExpirationDateBetween(LocalDate startDate, LocalDate endDate);

}
