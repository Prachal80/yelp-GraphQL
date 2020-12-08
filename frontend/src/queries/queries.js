import { gql } from 'apollo-boost';

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

const customer = gql`
query customer($_id: String){
    customer(_id:$_id){
        _id,
        name,
        email,
        password,
        birthdate,
        city,
        state,
        country,
        nickname,
        headline,
        phone,
        blog,
        yelpingSince,
        thingsIlove,
        profilePic,
        findMeIn,
    }
}
`;

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

const getRestaurantReviews = gql`
    query getRestaurantReviews($restaurant_id: String){
        getRestaurantReviews(restaurant_id: $restaurant_id){
            _id,
            rating,
            review,
            reviewdate,
            customerid,
            customername,
            restaurantid,
            restaurantname,
        }
    }
`



export {getAllRestaurants,customer, restaurant, getRestaurantDishes,getRestaurantReviews};