import { gql } from 'apollo-boost';

const getAllRestaurants = gql`
query getAllRestaurants{
    getAllRestaurants{
        _id,
        name,
        email,
        password,
        location,
        address,
        state,
        country,
        description,
        timings,
        contact,
        ratings,
        method,
        cuisine,
        restaurantProfilePic,
        dishes {
            _id
            dishname
            ingredients
            image
            price
            description
            category
            restaurantname
            restaurantid
          }
    }
  }
`;

const restaurant = gql`
query restaurant($_id: String){
    restaurant(_id:$_id){
        name,
        email,
        password,
        location,
        address,
        state,
        country,
        description,
        timings,
        contact,
        ratings,
        method,
        cuisine,
        restaurantProfilePic,
    }
}
`;

const getRestaurantDishes = gql`
    query getRestaurantDishes($restaurant_id: String){
        getRestaurantDishes(restaurant_id: $restaurant_id){
            _id,
            dishname,
            ingredients,
            image,
            price,
            description,
            category,
            restaurantname,
            restaurantid,
        }
    }
`

export {getAllRestaurants, restaurant, getRestaurantDishes};