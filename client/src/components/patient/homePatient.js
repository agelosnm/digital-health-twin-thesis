import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './homePatient.css'
import { Row, Col, Container, Card, Button } from 'react-bootstrap';

function HomePatient() {
    return (
        <div className="home-cards-container">
            <Row className="justify-content-md-center">
                <Col lg="6" xs="12">
                    <Card>
                        <a className="overflow" href="/myposts">
                            <Card.Img src={require('../../images/mastodon-toots.png')} />
                        </a>
                        <Card.Body>
                            <Card.Title>My posts</Card.Title>
                            <Card.Text>
                                See your posts
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="6" xs="12">
                    <Card>
                        <a className="overflow" href="/mydevices">
                            <Card.Img src={require('../../images/device-icon.png')} />
                        </a>
                        <Card.Body>
                            <Card.Title>My devices</Card.Title>
                            <Card.Text>
                                See and add your advices
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )

}


export default HomePatient;