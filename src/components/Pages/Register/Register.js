import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
      }
    
      onInputchange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      onSubmitForm() {
        console.log(this.state)
      }

    render() {
        return (
            // <div className="container">
            // <br /><br /><br /><br />
            
            <div className="login-From">

                <form onSubmit={this.onSubmitForm}>
                    <br />
                    <Row className="justify-content-md-center">
                        <h3 >Sign up</h3>
                    </Row>
                    <br />
                    <div className="form-group">
                        <Row>
                            <Col md={{ span: 2, offset: 2 }}><label>Firstname</label></Col>
                            <Col md={{ span: 6 }}> <input type="text" className="form-control" placeholder="Enter firstname" 
                             value={this.state.fname} onChange={this.onInputchange}/></Col>
                        </Row>

                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={{ span: 2, offset: 2 }}><label>Lastname</label></Col>
                            <Col md={{ span: 6 }}> <input type="text" className="form-control" placeholder="Enter lastname"
                            value={this.state.lname} onChange={this.onInputchange} /></Col>
                        </Row>

                    </div>
                    <div className="form-group">
                        <Row>
                            <Col md={{ span: 2, offset: 2 }}><label>Email</label></Col>
                            <Col md={{ span: 6 }}><input type="email" className="form-control" placeholder="Enter email" 
                            value={this.state.email} onChange={this.onInputchange}/></Col>
                        </Row>

                    </div>


                    {/* <div className="form-group">

                        <div className="custom-control custom-checkbox">
                            <Row>
                                <Col md={{ span: 3, offset: 4 }}><input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label></Col>
                                <Col md={{ span: 3 }}><p className="forgot-password text-right">
                                    Forgot <a href="#">password?</a>
                                </p></Col>
                            </Row>
                        </div>
                    </div> */}

                    <br />
                    
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 4}}><button type="submit" className="btn btn-warning btn-lg btn-block">Sign up</button></Col>
                    </Row>
                    <br />
                    
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 4}}>
                        <Link to="/login"><button type="button" className="btn btn-dark btn-lg btn-block">back</button></Link></Col>
                    </Row>



                </form>
                <br /><br /><br />
            </div>
            // </div>

        );
    }
}