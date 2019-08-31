import React, { Component } from 'react';
import { Container } from "native-base";
import { withFormik } from 'formik';
import * as yup from 'yup';

import {signIn, signUp, subscribeToAuthChanges} from "../api/auth";

import LoginForm from '../components/signIn';
import SignUpForm from '../components/signUp';

// TODO change setTimeout in auth
export default
@withFormik({
    mapPropsToValues: () => ({ email: '', password: '', displayName: '', signUp: false }),
    validationSchema: (props) => yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(10).required(),
        displayName: props.signUp ?
            yup.string().min(5).required() : null,
        signUp: null,
    }),
    handleSubmit: (values, { props }) => {
        console.log(values);
        values.signUp ? signUp(values) : signIn(values);
    },
})
class AuthScreen extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        signUp: false,
    };

    componentDidMount() {
        subscribeToAuthChanges(this.onAuthStateChanged);
    }

    onAuthStateChanged = user => {
        const { navigation } = this.props;
        if (user) {
            navigation.navigate('Home');
        }
    };

    signToggleHandler = signUp => {
        this.setState({signUp});
    };

    render() {
        const { signUp } = this.state;

        return (
            <Container style={{
                flex: 1,
                justifyContent: 'center',
                padding: 20
            }}>
                { signUp
                    ? (<SignUpForm {...this.props} signUpStatus={this.signToggleHandler} signUp={signUp}  />)
                    : (<LoginForm {...this.props} signUpStatus={this.signToggleHandler} signUp={signUp}  />)}
            </Container>
        );
    }
}