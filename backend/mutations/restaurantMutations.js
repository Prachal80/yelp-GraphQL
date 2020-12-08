const Customer = require("../models/customer");
const Restaurant = require("../models/restaurant");
const Orders = require("../models/orders");
const Review = require("../models/reviews");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);


async function restaurantLogin(data) {

    console.log("Inside restaurant Login");

    console.log("restaurant Login called", data)
    let restaurant = await Restaurant.findOne({ email: data.username })
    if(restaurant){
        if(bcrypt.compareSync(data.password, restaurant.password)) {
            return restaurant;
        }
        else{
            return new Error("Invalid credentials");
        }
        
    }
    else{
        return new Error("Invalid email");
    }
}

async function updateRestaurantProfile(data){
    console.log("Update Restaurant profile")

    var doc = await Restaurant.findByIdAndUpdate({_id:data.RID}, 
        {
            name : data.name,
            email: data.email,
            location: data.location,
            state: data.state,
            country: data.country,
            address: data.address,
            description: data.description,
            contact: data.contact,
            timings: data.timings,
            ratings: data.ratings,
            method: data.method,
            cuisine: data.cuisine,
            
        }, {new:true})
        return doc
        
}

async function addDish(data){
    console.log("Inside add Dish restaurant");
    
    var dish = await Restaurant.findByIdAndUpdate({_id:data.restaurantid},
        {$push:
            { 
                dishes:{   
                dishname:data.dishname,
                ingredients:data.ingredients,
                image:"",
                price: data.price,
                description: data.description,
                category:data.category,
                restaurantname: data.Rname,
                restaurantid: data.restaurantid,   
                }
            }        
    })
        if (dish) {
            return { success: true, res:"Added Dish"};
          } else {
            return { success: false, res:"Error while adding dish"};
           
          }
}

async function updateDish(data){
    console.log("Inside update dish restaurant")

    let dish = await Restaurant.findOneAndUpdate({dishes: {$elemMatch: {_id: data.dishid}}},
        {$set:
            { 
                "dishes.$":{
                dishname:data.dishname,
                ingredients:data.ingredients,
                image:"",
                price: data.price,
                description: data.description,
                category:data.category,   

                }        
    }
        
    },{new:true})
    if (dish) {
        return { success: true, res:"Updated Dish"};
      } else {
        return { success: false, res:"Error while updating dish"};  
      }
}

async function updateOrderStatus(data){

    console.log("Update order status")

    if (
        data.status === "Order Received" ||
        data.status === "Preparing" ||
        data.status === "Delivered" ||
        data.status === "On the way" ||
        data.status === "Ready for Pickup" ||
        data.status === "Picked up"
      ) {
    
        var order = await Orders.findByIdAndUpdate({_id:data.orderid},{
            $set:{
                status:data.status
            }
        })
       
      }
        if(order){
            console.log("updated order status", order);
            return {success: true, res:"Order status updated"}
        }
        else{
            return { success:false, res:"Order status update failed"}
        }

}


exports.updateOrderStatus = updateOrderStatus;
exports.updateDish = updateDish;
exports.addDish = addDish;
exports.restaurantLogin = restaurantLogin;
exports.updateRestaurantProfile = updateRestaurantProfile;

 