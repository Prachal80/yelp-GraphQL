import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import EachOrderCustomer from "../individual/individualPlacedOrders";


import { resolve } from "url";
import { graphql, compose, withApollo } from 'react-apollo';
import { Query } from "react-apollo";
import {getRestaurantOrdersCustomer} from "../../queries/queries";
// import {updateRestaurantProfile} from "../../mutations/mutations";


export class customerOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishname: "",
      price: "",
      category: "",
      restaurantname: "",
      status: "",
      orderpic: "",
      orderid: "",
      time: "",
      optiontype: "",
      orders: [],
      filter: "",
    };
  }
  ChangeHandler = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;

    //Get All orders made by a customer

    this.props.client.query({
      query: getRestaurantOrdersCustomer,
    
      variables: {
        customer_id: localStorage.getItem("CID"),
      }
    }).then(response => {
      console.log("Orders", response.data.getRestaurantOrdersCustomer);
      this.setState({
        orders: response.data.getRestaurantOrdersCustomer
      })
    }).catch(e => {
      console.log("error", e);
        console.log(e)
    })

  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }

    let orderDishAll = this.state.orders.map((order) => {
      if (this.state.filter !== "") {
        if (order.status === this.state.filter) {
          return <EachOrderCustomer data={order}></EachOrderCustomer>;
        }
      } else {
        return <EachOrderCustomer data={order}></EachOrderCustomer>;
      }
    });

    return (
      <div>
        {redirectVar}
        <div>
          <br />
          <br />
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            Your Orders
          </h2>
          <br />
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#f0ab0c",
                border: "1px solid #f0ab0c",
              }}
              className="btn btn-danger"
              value="Order Received"
              onClick={this.ChangeHandler}
            >
              Order Received
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#f07a0c",
                border: "1px solid #f07a0c",
              }}
              className="btn btn-danger"
              value="Preparing"
              onClick={this.ChangeHandler}
            >
              Preparing
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#D23232",
                border: "1px solid #D23232",
              }}
              className="btn btn-danger"
              value="On the way"
              onClick={this.ChangeHandler}
            >
              On the way
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#D23232",
                border: "1px solid #D23232",
              }}
              className="btn btn-danger"
              value="Ready for Pickup"
              onClick={this.ChangeHandler}
            >
              Ready for Pickup
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#11ad17",
                border: "1px solid #11ad17",
              }}
              className="btn btn-primary"
              value="Picked up"
              onClick={this.ChangeHandler}
            >
              Picked up
            </button>
            &nbsp;
            <button
              style={{
                float: "left",
                fontWeight: "bold",
                marginLeft: "5px",
                background: "#11ad17",
                border: "1px solid #11ad17",
              }}
              className="btn btn-primary"
              value="Delivered"
              onClick={this.ChangeHandler}
            >
              Delivered
            </button>
            &nbsp;
            <button
              style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
              className="btn btn-secondary"
              value=""
              onClick={this.ChangeHandler}
            >
              Clear
            </button>
          </div>
          <br />
          <hr />
        </div>

        <div class="row">
          <div style={{ width: "100%" }} class="col-6">
            <h2 style={{ textAlign: "center" }}>All orders</h2>
            <div style={{ overflowY: "scroll", height: "700px" }}>
              {orderDishAll}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(getRestaurantOrdersCustomer, { name: "getRestaurantOrdersCustomer" }),
  // graphql(restaurant,{name:"restaurant"}),
  
)(customerOrders);