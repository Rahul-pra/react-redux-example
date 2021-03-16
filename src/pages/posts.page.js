import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getAllPosts } from "../actions/post.action";
import { getUsers } from "../actions/user.action";
import { Accordion, Card, Button, Modal, Form } from 'react-bootstrap';


class postsPage extends React.Component {
    state = {
        show: false
    }
    componentDidMount = async () => {
        await this.props.getAllUsers();
        await this.props.getAllPosts();
    }

    handleShow = (e) => {
        this.setState({ show: true })
    }

    handleClose = (e) => {
        this.setState({ show: false })
    }

    render = () => {
        return (
            <>

                <Helmet>
                    <title>postsPage</title>
                </Helmet>
                <Button variant="primary" onClick={this.handleShow}>
                    Add Post
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form>
                        <Modal.Header closeButton>
                            <Modal.Title>New Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="title" placeholder="Title" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Body</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>UserId</Form.Label>
                                <Form.Control as="select">
                                    {!!this.props.allUsers && this.props.allUsers.length > 0 && this.props.allUsers.map((user, i) => {
                                        return (
                                            <option value={user.id}>{user.name}</option>
                                        )
                                    })}

                                    {/* <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option> */}
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" type="submit" onClick={this.handleClose}>
                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                <Accordion defaultActiveKey="0">
                    {!!this.props.allPosts && this.props.allPosts.length > 0 && this.props.allPosts.map((post, i) => {
                        return (
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={i + 1}>
                                        {post.title}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i + 1}>
                                    <Card.Body>{post.body}</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}


                </Accordion>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state ==>", state);
    return {
        allPosts: state.posts.data,
        allUsers: state.user.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => dispatch(getAllPosts()),
        getAllUsers: () => dispatch(getUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(postsPage)