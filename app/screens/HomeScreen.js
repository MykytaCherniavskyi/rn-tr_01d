import React from 'react';
import {Button, Text, View} from "react-native";
import {Form, Input, Item, Label} from "native-base";

import {addNote, getNotes} from '../api/notes';
import { signOut } from "../api/auth";

export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {

        onSignedOut = () => {
            console.log('signed out');
            navigation.navigate('Auth');
        };

        return {
          title: 'Home',
          headerRight: (
            <Button
                title="Log out"
                onPress={() => signOut(onSignedOut)}
            />
          ),
        };
    };

    state = {
        notes: [],
        currentNote: null,
    };

    onNoteAdded = note => {
        this.setState(state => ({notes: [...state.notes, note]}));
    };

    onNotesReceived = notesList => {
        this.setState(state => ({notes: notesList}));
    };

    componentDidMount() {
        getNotes(this.onNotesReceived);
    }

    render() {
        const {notes, currentNote} = this.state;
        console.log(notes, currentNote);
        return (
            <>
                <View style={{ flex: 2 }}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Note</Label>
                            <Input
                                onChangeText={text => this.setState(state => {
                                    const { currentNote = {} } = state;
                                    currentNote.data = text;
                                    return currentNote;
                                })}
                            />
                        </Item>
                        <Button title={'Save'} onPress={() => {
                            addNote({
                                title: currentNote.title,
                                data: currentNote.data,
                            }, this.onNoteAdded)
                        }} />
                    </Form>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Home Screen</Text>
                    <Button
                        title="Go to Details"
                        onPress={() => this.props.navigation.navigate('Details')}
                    />
                </View>
            </>
        );
    }
}