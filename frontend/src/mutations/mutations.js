import { gql } from 'apollo-boost';



const CustomerLoginMutation = gql`
    mutation CustomerLoginMutation($username: String, $password: String){
        customer_login(username: $username,password: $password){
            _id
            name
            email
        }
    }
`;

const RestaurantLoginMutation = gql`
    mutation RestaurantLoginMutation($username: String, $password: String){
        restaurant_login(username: $username, password: $password){
            _id
            name
            email
        }
    }
`;


const updateRestaurantProfile= gql`
    mutation updateRestaurantProfile( $name: String , $email: String , $location: String , $state: String , $country: String , $address: String , $description: String , $contact: String , $timings: String , $ratings: String , $method: String , $cuisine: String , $RID: String ){

        restaurant_update_profile( name: $name  , email: $email  , location: $location  , state: $state  , country: $country  , address: $address  , description: $description  , contact: $contact  , timings: $timings  , ratings: $ratings  , method: $method  , cuisine: $cuisine, RID: $RID ){

            _id
            name
            email
            password
            location
            address
            state
            country
            description
            timings
            contact
            ratings
            method
            cuisine
            restaurantProfilePic
           
        }
    }
`;

const updateCustomerProfile= gql`
    mutation updateCustomerProfile( $name: String , $dob: String , $emailid: String , $city: String , $state: String , $country: String , $nickname: String , $headline: String , $phone: String , $blog: String , $yelpingSince: String , $thingsIlove: String , $findMeIn: String , $CID: String){
      
        customer_update_profile( name: $name , dob: $dob , emailid: $emailid , city: $city , state: $state , country: $country , nickname: $nickname , headline: $headline , phone: $phone , blog: $blog , yelpingSince: $yelpingSince , thingsIlove: $thingsIlove , findMeIn: $findMeIn , CID: $CID ){

            name
            dob
            emailid
            city
            state
            country
            nickname
            headline
            phone
            blog
            yelpingSince
            thingsIlove
            findMeIn
           
        }
    }
`;

const makeOrderCustomer =  gql`
mutation makeOrderCustomer($dishname: String, $dishimage: String, $option: String, $price: String, $category: String, $customerid: String, $customername: String, $restaurantid: String,$restaurantname: String, $status: String, $time: String){
    
    customer_make_order(dishname: $dishname, dishimage: $dishimage, option: $option, price: $price, category: $category, customerid: $customerid, customername: $customername, restaurantid: $restaurantid, restaurantname: $restaurantname, status: $status, time: $time){
        res,
        success
    }
}
`;

const updateOrderStatus = gql`
    mutation updateOrderStatus($orderid: String, $status: String){
        change_order_status(orderid: $orderid, status: $status){
            res,
            success
        }
    }
`;


export {CustomerLoginMutation,RestaurantLoginMutation,updateRestaurantProfile,updateCustomerProfile,makeOrderCustomer, updateOrderStatus} ; 
