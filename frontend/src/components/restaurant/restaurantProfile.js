import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Card, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { BsStarFill } from "react-icons/all";

import { resolve } from "url";
import { graphql, compose, withApollo } from 'react-apollo';
import { Query } from "react-apollo";
import {restaurant} from "../../queries/queries";
import {updateRestaurantProfile} from "../../mutations/mutations";


class RestaurantProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      address: "",
      state: "",
      country: "",
      description: "",
      timings: "",
      email: "",
      contact: "",
      ratings: "",
      method: "",
      cuisine: "",
      restaurantProfilePic: "",
      ErrorMessage: "",
    };

    //Bind the handlers to this class
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }
  componentDidMount() {
    
    //make a post request with the Restaurant data
    let data = {
      RID: localStorage.getItem("RID"),
    };
    this.props.client.query({
      query: restaurant,
    
      variables: {
        _id: data.RID,
      }
    }).then(response => {
      console.log("Restaurant", response.data.restaurant);
      this.setState({
        name: response.data.restaurant.name,
        location: response.data.restaurant.location,
        address: response.data.restaurant.address,
        state: response.data.restaurant.state,
        country: response.data.restaurant.country,
        restaurantdescription: response.data.restaurant.description,
        timings: response.data.restaurant.timings,
        email: response.data.restaurant.email,
        contact: response.data.restaurant.contact,
        ratings: response.data.restaurant.ratings,
        method: response.data.restaurant.method,
        cuisine: response.data.restaurant.cuisine,
        description: response.data.restaurant.description,
        restaurantProfilePic: response.data.restaurant.restaurantProfilePic,
      })
    }).catch(e => {
      console.log("error", e);
        console.log(e)
    })
  }
  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //submit Login handler to send a request to the node backend
  submitUpdate = (e) => {
    //prevent page from refresh
    //e.preventDefault();

    this.props.updateRestaurantProfile({
      variables: {
          name: this.state.name,
          location: this.state.location,
          address: this.state.address,
          state: this.state.state,
          country: this.state.country,
          description: this.state.description,
          timings: this.state.timings,
          email: this.state.email,
          contact: this.state.contact,
          method: this.state.method,
          restaurantProfilePic: this.state.restaurantProfilePic,
          cuisine: this.state.cuisine,
          RID: localStorage.getItem("RID")
      }
    }).then(res => {
      if(res.data){
        console.log("response",res.data.updateRestaurantProfile);
        
      }
    })
    .catch(err=>{
      console.log(err)
    });

  };

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("RID")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div>
          <div class="row" style={{ marginTop: "2%" }}>
            <div
              style={{
                marginLeft: "2%",
                marginRight: "1%",
              }}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Header>Name : {this.state.name}</Card.Header>
                <ListGroup variant="primary">
                  <ListGroup.Item>Email : {this.state.email}</ListGroup.Item>
                  <ListGroup.Item>
                    Contact : {this.state.contact}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Timings : {this.state.timings}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description : {this.state.description}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
            <div
              style={{
                marginRight: "1%",
              }}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Header>Location City : {this.state.location}</Card.Header>
                <ListGroup variant="primary">
                  <ListGroup.Item>
                    Address : {this.state.address}
                  </ListGroup.Item>
                  <ListGroup.Item>State : {this.state.state}</ListGroup.Item>
                  <ListGroup.Item>
                    Country : {this.state.country}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Ratings : {this.state.ratings} <BsStarFill />
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
            <div>
              <img
                src={
                  "http://" +
                  process.env.REACT_APP_IP +
                  ":3001/" +
                  this.state.restaurantProfilePic
                }
                alt="Profile Pic"
                style={{
                  width: "400px",
                  height: "250px",

                  // marginLeft: "18%",
                }}
              ></img>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <Map
                google={this.props.google}
                zoom={16}
                style={{ width: "400px", height: "250px" }}
              >
                <Marker
                  onClick={this.state.address}
                  name={"Current location"}
                />

                <InfoWindow onClose={this.onInfoWindowClose}>
                  <div>
                    <h1>{this.state.address}</h1>
                  </div>
                </InfoWindow>
              </Map>
            </div>
          </div>

          <hr />
          <br />

          <h3 style={{ marginLeft: "20px" }}>
            Delivery options: {this.state.method}
            &nbsp; &nbsp; Cuisine: {this.state.cuisine}
          </h3>

          <br />
          <div class="row">
            <div
              style={{
                marginLeft: "2%",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <form
                action="http://localhost:3001/restaurantProfile/updateRestaurantProfilePic"
                method="POST"
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  name="RID"
                  value={localStorage.getItem("RID")}
                  style={{ display: "none", width: "10px" }}
                />
                <input type="file" name="restaurantprofilePic" />
                <br />
                <br />
                <button
                  type="submit"
                  class="btn"
                  style={{
                    backgroundColor: "#D32323",
                    color: "#ffffff",
                    fontWeight: "bold",
                    borderBlockColor: "white",
                    border: "1px #D32323",
                    width: "150px",
                  }}
                >
                  Update Picture
                </button>

                <br />
              </form>
            </div>
            <div>
              <div id="formContent">
                <form
                  onSubmit={this.submitUpdate}
                  style={{
                    background: "#ffe6e6",
                    left: "2%",
                    top: "65%",
                    borderRadius: "2%",
                    marginLeft: "2%",
                    border: "1px solid black",
                  }}
                >
                  <Container>
                    <p
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "2px",
                      }}
                    >
                      Update Restaurant Details
                    </p>
                    <Row>
                      <Col xs={3}>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          class="form-control"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                      <Col xs={2}>
                        <input
                          type="text"
                          name="cuisine"
                          placeholder="Cuisine"
                          class="form-control"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                      <Col xs={7}>
                        <input
                          type="text"
                          name="description"
                          placeholder="Description"
                          class="form-control"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col xs={3}>
                        <input
                          type="text"
                          name="location"
                          class="form-control"
                          placeholder="Loaction City"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                      <Col xs={3}>
                        <input
                          type="text"
                          name="address"
                          class="form-control"
                          placeholder="Address"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                      <Col xs={3}>
                        <input
                          type="text"
                          name="state"
                          class="form-control"
                          id="state"
                          placeholder="State"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                      <Col xs={3}>
                        <input
                          type="text"
                          name="country"
                          class="form-control"
                          placeholder="Country"
                          id="country"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col xs={3}>
                        <input
                          type="email"
                          name="email"
                          class="form-control"
                          placeholder="Email"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                      <Col xs={3}>
                        <input
                          type="text"
                          name="contact"
                          class="form-control"
                          placeholder="Contact"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                      <Col xs={2}>
                        <input
                          type="text"
                          name="timings"
                          class="form-control"
                          placeholder="Timings"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                      <Col xs={4}>
                        <input
                          type="text"
                          name="method"
                          class="form-control"
                          placeholder="Service"
                          onChange={this.ChangeHandler}
                        />
                      </Col>
                    </Row>
                  </Container>
                  <br />
                  <button
                    type="submit"
                    class="btn btn-primary"
                    style={{
                      background: "#D32323",
                      color: "#ffffff",
                      fontWeight: "bold",
                      borderBlockColor: "white",
                      border: "1px #D32323",
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyBIRmVN1sk9HHlXxIAg-3_H5oRb2j-TyC4",
})(RestaurantProfile);

export default compose(
  withApollo,
  graphql(updateRestaurantProfile, { name: "updateRestaurantProfile" }),
  graphql(restaurant,{name:"restaurant"}),
  
)(WrappedContainer, RestaurantProfile);
