package com.bellLabs.bellLabs_api.models;

import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
@Table(name = "grocery_item")
public class GroceryItem {
    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "grocery_item_id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "unit")
    private String unit;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

//    @ManyToOne
//    @JoinColumn(name = "shopping_list_id")
//    private ShoppingList shoppingList;

    //no-argument constructor for JPA
    public GroceryItem() {
    }


    public GroceryItem(String name, int quantity, String unit, LocalDate expirationDate) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.expirationDate = expirationDate;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

//    public ShoppingList getShoppingList() {
//        return shoppingList;
//    }
//
//    public void setShoppingList(ShoppingList shoppingList) {
//        this.shoppingList = shoppingList;
//    }
}
