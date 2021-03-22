import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getUsers } from "../actions/user.action";
import { Form, ListGroup } from 'react-bootstrap';


class usersPage extends React.Component {
    state = {
        allUsersData: []
    }
    componentDidMount = async () => {
        await this.props.getUsers();
        //console.log("test 11 2222222==>", this.props)
    }

    static getDerivedStateFromProps(props, state) {
        const { allUsers } = props;
        if (allUsers) {
            return {
                allUsersData: allUsers
            }
        }
        return {}
    }


    render = () => {
        //console.log("test 11 222==>", this.props.allUsers)
        console.log("states 111==>", this.state);
        return (
            <>
                <Helmet>
                    <title>usersPage</title>
                </Helmet>

                {!!this.state.allUsersData && this.state.allUsersData.length > 0 && this.state.allUsersData.map((userValue) => {
                    return (
                        <ListGroup variant="flush">
                            <ListGroup.Item>Id: {userValue.id}</ListGroup.Item>
                            <ListGroup.Item>Name: {userValue.name}</ListGroup.Item>
                            <ListGroup.Item>Email: {userValue.email}</ListGroup.Item>
                            <ListGroup.Item>Username: {userValue.username}</ListGroup.Item>
                        </ListGroup>
                    )
                })}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.user.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(usersPage)