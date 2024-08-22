package com.bellLabs.bellLabs_api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "shopping_list_item")
public class ShoppingListItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shopping_list_item_id")
    private int shoppingListItemId;
//    private int shoppingListId;
//    private int groceryItemId;
    @Column(name = "item_name")
    private String itemName;
    @Column(name = "quantity")
    private int quantity;

    private String unit;

    @ManyToOne
    @JoinColumn(name = "shopping_list_id")
    @JsonIgnore
    private ShoppingList shoppingList;


    public ShoppingListItem(String itemName, int quantity, String unit) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.unit = unit;
    }

    public ShoppingListItem() {
    }

    //Getters & Setters
    public int getShoppingListItemId() {
        return shoppingListItemId;
    }

    public void setShoppingListItemId(int shoppingListItemId) {
        this.shoppingListItemId = shoppingListItemId;
    }


    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public ShoppingList getShoppingList() {
        return shoppingList;
    }

    public void setShoppingList(ShoppingList shoppingList) {
        this.shoppingList = shoppingList;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }


}
