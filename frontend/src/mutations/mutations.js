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
        restaurant_login(username: $username,password: $password){
            _id
            name
            email
        }
    }
`;

export {CustomerLoginMutation,RestaurantLoginMutation} ; 
