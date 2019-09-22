import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    validationText: {
        marginTop: 8,
        marginBottom: 16,
        color: 'red',
        alignSelf: 'center'
    },
});

export default class SignUp extends Component{
    toSignIn = () => {
        const { signUpStatus } = this.props;
        signUpStatus(false);
    };

    render() {
        const { handleSubmit, setFieldValue, errors, signUp } = this.props;

        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                onChangeText={text => setFieldValue('email', text)}
                            />
                        </Item>
                        <Text style={styles.validationText}>{errors.email}</Text>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input
                                onChangeText={text => setFieldValue('displayName', text)}
                            />
                        </Item>
                        <Text style={styles.validationText}>{errors.displayName}</Text>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={text => setFieldValue('password', text)}
                            />
                        </Item>
                        <Text style={styles.validationText}>{errors.password}</Text>
                        <Button
                            onPress={() => {
                                setFieldValue('signUp', signUp);
                                setTimeout(() => handleSubmit(),0);
                            }}
                            style={styles.center}
                            primary
                        >
                            <Text>Register</Text>
                        </Button>
                        <Button style={styles.center} onPress={this.toSignIn} transparent>
                            <Text>Sign In</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}