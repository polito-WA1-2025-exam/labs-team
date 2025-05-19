# Group "Ing"

## Members
- s314325 Canavero Serena

# Exercise "Rescuing Surplus Food"

# Lab Journal

Local database: 
establishments: store/restaurant info  
bags: info about each bag  
food_items: info about each food type  
bag_contents: which foods and how many in which bag  
users: user accounts  
shopping_cart: which bags users reserved  


API design:  
a. retrieve the list of all items of the main collections:  

    GET \establishments 
    Returns list of all establishments 

    GET \establishments\:id\bags  
    Returns list of all bags for the specific establishment  

    GET \bags\.id\food_items  
    Returns list of all food items contained in a specific bag  

    GET \shopping_cart?user=:userId 
    Returns shopping cart contents for a given user  

b. retrieve a list of items with specific characteristics 
    
    GET /bags?state=available → list of available bags  

    GET /establishments?category=Bakery → establishments by food category  

c. retrieve a specific item  
   
    GET /establishments/:id → get one establishment by ID 

    GET /bags/:id → get one bag by ID  

    GET /food_items/:id → get one food item by ID  

d. create a new item by providing all its information, except the "id" that will be automatically assigned by the back_end  

    POST /establishments/:id/bags  

    POST /bags/:id/food_items  

    POST /shopping_cart  

e. update an existing item, by providing its information (all the properties except the id)  

    PUT /establishments/:id → replace establishment info  

    PUT /bags/:id → replace bag info completely  

    PUT /food_items/:id → replace food item info  

f. update specific attributes of a specific item  


g. delete an existing item  

    DELETE /establishments/:id  

    DELETE /bags/:id  

    DELETE /food_items/:id  

    DELETE /shopping_cart/:userId/:bagId → remove specific bag from shopping cart   


Lab 7: Multiple pages through routes 

| URL Path                   | Rendered Component   | Description                                                                |
| -------------------------- | -------------------- | -------------------------------------------------------------------------- |
| `/establishments`          | `EstablishmentsPage` | Displays a list of establishments available in the app.                    |
| `/establishments/:id/bags` | `BagsPage`           | Shows available bags for a specific establishment (by `:id`).              |
| `/cart`                    | `CartPage`           | Displays the shopping cart with selected bags and allows editing contents. |

