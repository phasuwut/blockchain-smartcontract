import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            // <div className="container">
            // <br /><br /><br /><br />
            <div className="login-From">

                <form>
                    <br />
                    <Row className="justify-content-md-center">
                        <h3 >Sign in</h3>
                    </Row>
                    <br />
                    <div className="form-group">
                        <Row>
                            <Col md={{ span: 2, offset: 2 }}><label>Email</label></Col>
                            <Col md={{ span: 6 }}><input type="email" className="form-control" placeholder="Enter email" /></Col>
                        </Row>

                    </div>

                    <div className="form-group">
                        <Row>
                            <Col md={{ span: 2, offset: 2 }}><label>Password</label></Col>
                            <Col md={{ span: 6 }}> <input type="password" className="form-control" placeholder="Enter password" /></Col>
                        </Row>

                    </div>

                    <div className="form-group">

                        <div className="custom-control custom-checkbox">
                            <Row>
                                <Col md={{ span: 3, offset: 4 }}><input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label></Col>
                                <Col md={{ span: 3 }}><p className="forgot-password text-right">
                                    Forgot <a href="#">password?</a>
                                </p></Col>
                            </Row>
                        </div>
                    </div>

                    <br />
                    
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 4}}><button type="submit" className="btn btn-warning btn-lg btn-block">Sign in</button></Col>
                    </Row>
                    <br />
                    
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 4}}>
                        <Link to="/register"><button type="submit" className="btn btn-dark btn-lg btn-block">Sign up</button></Link></Col>
                    </Row>
                    <br />
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 4}}>
                        <Link to="/home"><button type="submit" className="btn btn-dark btn-lg btn-block">back</button></Link></Col>
                    </Row>



                </form>
                <br /><br /><br />
            </div>
            // </div>

        );
    }
}