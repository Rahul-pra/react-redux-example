import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getAllPosts, createNewPost } from "../actions/post.action";
import { getUsers } from "../actions/user.action";
import { Accordion, Card, Button, Modal, Form } from 'react-bootstrap';


class postsPage extends React.Component {
    state = {
        show: false,
        fields: {},
        errors: {}
    }
    componentDidMount = async () => {
        await this.props.getAllUsers();
        await this.props.getAllPosts();
    }

    handleShow = (e) => {
        this.setState({ show: true })
        this.setState({ fields: {} })
    }

    handleClose = (e) => {
        this.setState({ show: false })
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        console.log("fields ==>", this.state.fields)
        //name="title"
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Cannot be empty";
        }

        if (typeof fields["title"] !== "undefined") {
            if (!fields["title"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["title"] = "Only letters";
            }
        }



        //name="body"
        if (!fields["body"]) {
            formIsValid = false;
            errors["body"] = "Cannot be empty";
        }

        if (typeof fields["body"] !== "undefined") {

            if (this.state.fields["body"].length < 15) {
                formIsValid = false;
                errors["body"] = "More than 15 character";
            }
        }

        //name="UserId"
        if (!fields["UserId"]) {
            formIsValid = false;
            errors["UserId"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleSaveClicked = async (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            //alert("Form submitted");
            //console.log("formdata ==>", this.state.fields)
            await this.props.addNewPost(this.state.fields);
            console.log("newPost ==>", this.props.newPost)
            
            this.handleClose();

        } else {
            console.log("errors ==>", this.state.errors)
            //alert("Form has errors.")
        }
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
                    <Form onSubmit={this.handleSaveClicked.bind(this)} name="postform" method="post">
                        <Modal.Header closeButton>
                            <Modal.Title>New Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control as="input" type="title" placeholder="Title" name="title" onChange={this.handleChange.bind(this, "title")} value={this.state.fields["title"]} />
                                <span style={{ color: "red" }}>{this.state.errors["title"]}</span>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Body</Form.Label>
                                <Form.Control as="textarea" name="body" rows={3} onChange={this.handleChange.bind(this, "body")} value={this.state.fields["body"]} />
                                <span style={{ color: "red" }}>{this.state.errors["body"]}</span>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>UserId</Form.Label>
                                <Form.Control as="select" name="UserId" onChange={this.handleChange.bind(this, "UserId")} value={this.state.fields["UserId"]}>
                                    <option value="">Please Select Name</option>
                                    {!!this.props.allUsers && this.props.allUsers.length > 0 && this.props.allUsers.map((user, i) => {
                                        return (
                                            <option value={user.id}>{user.name}</option>
                                        )
                                    })}
                                </Form.Control>
                                <span style={{ color: "red" }}>{this.state.errors["UserId"]}</span>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" type="submit" onClick={this.handleSaveClicked.bind(this)}>
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
        allUsers: state.user.data,
        newPost: state.posts.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => dispatch(getAllPosts()),
        getAllUsers: () => dispatch(getUsers()),
        addNewPost: (newpost) => dispatch(createNewPost(newpost))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(postsPage)