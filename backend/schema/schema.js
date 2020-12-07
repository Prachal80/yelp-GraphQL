const graphql = require('graphql');
const Customer = require("../models/customer");
const Restaurant = require("../models/restaurant");
const Orders = require("../models/orders");
const Reviews = require("../models/reviews");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
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


module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: Mutation
});
