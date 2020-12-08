const graphql = require('graphql');
const Customer = require("../models/customer");
const Restaurant = require("../models/restaurant");
const Orders = require("../models/orders");
const Reviews = require("../models/reviews");

const {customerLogin, updateCustomerProfile, makeOrderCustomer, cancelOrderCustomer, addReview} = require("../mutations/customerMutations");
const {restaurantLogin, updateRestaurantProfile, addDish , updateDish, updateOrderStatus} = require("../mutations/restaurantMutations");
const { resolve } = require('path');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;


const customerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        birthdate: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        nickname: { type: GraphQLString },
        headline: { type: GraphQLString },
        phone: { type: GraphQLString },
        blog: { type: GraphQLString },
        yelpingSince: { type: GraphQLString },
        thingsIlove: { type: GraphQLString },
        profilePic: { type: GraphQLString },
        findMeIn: { type: GraphQLString },
    })
});

const restaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        address: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        description: { type: GraphQLString },
        timings: { type: GraphQLString },
        contact: { type: GraphQLString },
        ratings: { type: GraphQLString },
        method: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        restaurantProfilePic: { type: GraphQLString },
        dishes: { type: GraphQLList(dishType) },
    
    })
});

const dishType = new GraphQLObjectType({
    name: "Dishes",
    fields: () =>({
        _id: { type: GraphQLID },
        dishname : { type: GraphQLString } ,
        ingredients: { type: GraphQLString },
        image: { type: GraphQLString },
        price: { type: GraphQLString },
        description: { type: GraphQLString },
        category: { type: GraphQLString }, 
        restaurantname: { type: GraphQLString },
        restaurantid: { type: GraphQLString },
    })
})

const reviewType = new GraphQLObjectType({
    name: "Reviews",
    fields: () =>({
        _id: { type: GraphQLString },
        rating: { type: GraphQLString },
        review: { type: GraphQLString },
        reviewdate: { type: GraphQLString },
        customerid: { type: GraphQLString },
        customername: { type: GraphQLString },
        restaurantid: { type: GraphQLString },
        restaurantname: { type: GraphQLString },
    })
})

const orderType = new GraphQLObjectType({
    name:"Orders",
    fields: () =>({
        _id: { type: GraphQLString },
        dishname: { type: GraphQLString },
        price: { type: GraphQLString },
        dishimage: { type: GraphQLString },
        option: { type: GraphQLString },
        category: { type: GraphQLString },
        customerid: { type: GraphQLString },
        customername: { type: GraphQLString },
        restaurantid: { type: GraphQLString },
        restaurantname: { type: GraphQLString },
        status: { type: GraphQLString },
        time: { type: GraphQLString },
    })
    
})

const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: () => ({
        success: { type: GraphQLBoolean },
        res: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: customerType,
            args: { _id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let customer = await Customer.findById({ _id: args._id });
                if (customer) {
                    console.log("Customer", customer);
                    return customer;
                }
            }
        },

        restaurant:{
            type: restaurantType,
            args: { _id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let restaurant = await Restaurant.findById({ _id: args._id });
                if (restaurant) {
                    console.log("restaurant", restaurant);
                    return restaurant;
                }
            }
        },

        getRestaurantReviews:{
            type:  GraphQLList(reviewType),
            args: { restaurant_id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let reviews = await Reviews.find({ restaurantid: args.restaurant_id });
                if (reviews) {
                    console.log("review", reviews);
                    return reviews;
                }
            }
        },

        getCustomerReviews:{
            type: GraphQLList(reviewType),
            args: {
                    RID: { type: GraphQLString } ,
                    CID: { type: GraphQLString } 
                },
            async resolve(parent, args){
                console.log("args".args);

                let reviews = await Reviews.find({restaurantid:args.RID, customerid: args.CID});
                if(reviews){
                    console.log("reviews in customerside", reviews);
                    return reviews;
                }
                else{
                    console.log("order make error", orders);
                    return reviews;
                }
            }    
        },

        getRestaurantDishes:{
            type:  GraphQLList(dishType),
            args: { restaurant_id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let restaurant = await Restaurant.findById({ _id: args.restaurant_id });
                if (restaurant) {
                    console.log("dishes", restaurant.dishes);
                    return restaurant.dishes;
                }
            }
        },

        getRestaurantOrdersCustomer:{
            type:  GraphQLList(orderType),
            args: { customer_id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("args", args);
                let orders = await Orders.find({customerid: args.customer_id, 
                    status:{
                        $ne:"Cancelled",
                    }
                  })
                if (orders) {
                    console.log("orders", orders);
                    return orders;
                }
            }
        },
       
        getAllRestaurants:{
            type:  GraphQLList(restaurantType),
            args: { },
            async resolve(parent, args) {
                console.log("args", args);
                let restaurants = await Restaurant.find({});
                if (restaurants) {
                    console.log("restaurants", restaurants);
                    return restaurants;
                }
            }
        },

        getAllOrders:{
            type:  GraphQLList(orderType),
            args: { restaurant_id : { type: GraphQLString }},
            async resolve(parent, args) {
                console.log("args", args);
                let orders = Orders.find({restaurantid: args.restaurant_id});
                if (orders) {
                    console.log("orders", orders);
                    return orders;
                }
            }
        },

    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        customer_login: {
            type: customerType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                return await customerLogin(args);
            }
        },
        customer_update_profile:{
            type: customerType,
    
            args: {
                name: { type: GraphQLString },
                dob: { type: GraphQLString }, 
                emailid: { type: GraphQLString }, 
                city: { type: GraphQLString }, 
                state: { type: GraphQLString }, 
                country: { type: GraphQLString },
                nickname: { type: GraphQLString }, 
                headline: { type: GraphQLString }, 
                phone: { type: GraphQLString }, 
                blog: { type: GraphQLString }, 
                yelpingSince: { type: GraphQLString }, 
                thingsIlove: { type: GraphQLString }, 
                findMeIn: { type: GraphQLString },
                CID: { type: GraphQLString }, 
            },
            async resolve(parent, args){
                return updateCustomerProfile(args);
            }
        },

        customer_make_order:{
            type: ResponseType,

            args:{
                dishname: { type: GraphQLString },
                dishimage: { type: GraphQLString },
                option: { type: GraphQLString },
                price: { type: GraphQLString },
                category: { type: GraphQLString },
                customerid: { type: GraphQLString },
                customername: { type: GraphQLString },
                restaurantid: { type: GraphQLString },
                restaurantname: { type: GraphQLString },
                status: { type: GraphQLString },
                time: { type: GraphQLString },
            },
            async resolve(parent, args){
                return makeOrderCustomer(args);
            }
        },
        
        customer_cancel_order:{
            type:ResponseType,

            args:{
                orderid: { type: GraphQLString},
            },
            async resolve(parent, args){
                return cancelOrderCustomer(args)
            }
        },

        customer_add_review:{
            type:ResponseType,
            args:{
                rating: { type: GraphQLString },
                review: { type: GraphQLString },
                reviewdate: { type: GraphQLString },
                customerid: { type: GraphQLString },
                customername: { type: GraphQLString },
                restaurantid: { type: GraphQLString },
                restaurantname: { type: GraphQLString },
            },
            async resolve(parent, args){
                return addReview(args)
            }
        },

    //RESTAURANT

    restaurant_login: {
        type: restaurantType,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        async resolve(parent, args) {
            return await restaurantLogin(args);
        }
    },

    restaurant_update_profile:{
        type: restaurantType,

        args: {
            name : { type: GraphQLString },
            email: { type: GraphQLString },
            location: { type: GraphQLString },
            state: { type: GraphQLString },
            country: { type: GraphQLString },
            address: { type: GraphQLString },
            description: { type: GraphQLString },
            contact: { type: GraphQLString },
            timings: { type: GraphQLString },
            ratings: { type: GraphQLString },
            method: { type: GraphQLString },
            cuisine: { type: GraphQLString },
            RID: { type: GraphQLString }, 
        },
        async resolve(parent, args){
            return updateRestaurantProfile(args);
        }
    },


    restaurant_add_dish:{
        type: ResponseType,

        args:{
            dishname:{ type: GraphQLString },
            ingredients:{ type: GraphQLString },
            image:{ type: GraphQLString },
            price: { type: GraphQLString },
            description: { type: GraphQLString },
            category:{ type: GraphQLString },
            restaurantname: { type: GraphQLString },
            restaurantid: { type: GraphQLString },
        },

        async resolve(parent,args){
            return addDish(args)
        }
    },

    restaurant_update_dish:{
        type: ResponseType,

        args:{  dishid:{ type: GraphQLString },
                dishname:{ type: GraphQLString },
                ingredients:{ type: GraphQLString },
                image:{ type: GraphQLString },
                price: { type: GraphQLString },
                description: { type: GraphQLString },
                category:{ type: GraphQLString },
        },

        async resolve(parent, args){
            return updateDish(args)
        }
    },

    change_order_status:{
        type: ResponseType,
        args:{
            orderid:{ type: GraphQLString },
            status:{ type: GraphQLString }
        },
        async resolve(parent, args){
            return updateOrderStatus(args)
        }
    }


    },

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
