import axios from 'axios'
import { useState } from 'react'


const ShoppingList = () => {
    const [activeTab, setActiveTab] = useState('regular');
    const [regularshoppingLists, setRegularShoppingLists] = useState([]);
    const [mealPlanShoppingLists, setMealPlanShoppingLists] = useState([]);
    //adding a new list
const addNewShoppingList = (newList) => {
    setShoppingLists([shoppingLists, newList])
}
    // Function to fetch shoppingLists linked to a meal plan using Axios
const fetchShoppingList = async () => {

}
  return (
    
    <div>
        <h1>Shopping List</h1>
        <div className='tabs'>
            <button onClick={() => setActiveTab('regular')}>Shopping Lists</button>
        </div>
        </div>

  )
}

export default ShoppingList