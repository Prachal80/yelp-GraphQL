const Customer = require("../models/customer");
const Restaurant = require("../models/restaurant");
const Orders = require("../models/orders");
const Review = require("../models/reviews");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

async function customerLogin(data) {

    console.log("Inside customer Login");

    console.log("Customer Login called", data)
    let customer = await Customer.findOne({ email: data.username })
    if(customer){
        if(bcrypt.compareSync(data.password, customer.password)) {
            return customer;
        }
        else{
            return new Error("Invalid credentials");
        }
        
    }
    else{
        return new Error("Invalid email");
    }
}

async function updateCustomerProfile(data){
    console.log("Update customer profile")

    var doc = await Customer.findByIdAndUpdate({_id:data.CID}, 
        {
            name : data.name,
            birthdate : data.dob,
            email: data.emailid,
            city: data.city,
            state: data.state,
            country: data.country,
            nickname: data.nickname,
            headline: data.headline,
            phone: data.phone,
            blog: data.blog,
            yelpingSince: data.yelpingSince,
            findMeIn: data.findMeIn,
            thingsIlove: data.thingsIlove,
            
        }, {new:true})
        return doc
        
}

async function makeOrderCustomer(data){

    console.log("Make order customer")

    console.log("CID", data.customerid);
    console.log("RID", data.restaurantid);
    
    var newOrder = new Orders({
        dishname: data.dishname,
        dishimage: data.dishimage,
        option: data.option,
        price: data.price,
        category: data.category,
        customerid: data.customerid,
        customername: data.customername,
        restaurantid: data.restaurantid,
        restaurantname: data.restaurantname,
        status: data.status,
        time: data.time,
    });
    console.log("new order",newOrder)
    var doc = await newOrder.save();
    if(doc){
        console.log(doc)
        return { success: true , res: "Order successful"};
    } 
    else{
        return { success: false , res: "Order falied"}
    }   
}

async function cancelOrderCustomer(data){

    console.log("Cancel order customer")

    let order = await Orders.findByIdAndUpdate({_id:data.orderid},
        {
            $set:{
                status:"Cancelled",
        }      
        })
        if(order){
            console.log("cancelled order", order);
            return {success: true, res:"Order cancelled"}
        }
        else{
            return { success:false, res:"Order cancel failed"}
        }

}

async function addReview(data){
    console.log("Inside review Customer side");
    
    var newReview = new Review({
    rating: data.rating,
    review: data.review,
    reviewdate: data.reviewdate,
    customerid: data.CID,
    customername: data.customername,
    restaurantid: data.RID,
    restaurantname: data.restaurantname,
    })

    let review = await newReview.save()
        if (review) {
            return { success: true, res:"Added review"};
          } else {
            return { success: false, res:"Error while adding review"};
           
          }
}

exports.customerLogin = customerLogin;
exports.updateCustomerProfile= updateCustomerProfile;
exports.makeOrderCustomer=makeOrderCustomer;
exports.cancelOrderCustomer=cancelOrderCustomer;
exports.addReview=addReview;