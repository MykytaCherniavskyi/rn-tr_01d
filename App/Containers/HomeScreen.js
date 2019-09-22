import React from 'react';
import {Button, View, SafeAreaView, ScrollView} from "react-native";
import {Input, Item, Label, List, ListItem, Text} from "native-base";

import {addNote, getNotes} from '../api/notes';
import { signOut } from "../api/auth";

export default class HomeScreen extends React.Component {
    static navigationOptions({ navigation }) {

        const onSignedOut = () => {
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
        currentNote: {},
    };

    onNoteAdded = note => {
        this.setState(state => ({notes: [...state.notes, note]}));
    };

    onNotesReceived = notesList => {
        this.setState(state => ({notes: notesList}));
    };

    onDraftSubmit = draft => {
      addNote({
          title: draft.title,
          note: draft.note,
      }, this.onNoteAdded);
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
                    <View>
                        <Button title={'Add note'} onPress={() => {
                            this.props.navigation.navigate('Draft', {
                                draftSubmit: this.onDraftSubmit,
                            });
                            // addNote({
                            //     title: currentNote.title,
                            //     note: currentNote.note,
                            // }, this.onNoteAdded)
                        }} />
                    </View>
                    <SafeAreaView>
                        <ScrollView>
                            <List>
                                {
                                    notes.length > 0 && notes.map((item, index) => (
                                        <ListItem key={index}>
                                            <Text>{item.note}</Text>
                                        </ListItem>))
                                }
                            </List>
                        </ScrollView>
                    </SafeAreaView>
                </View>
{/*                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Home Screen</Text>
                    <Button
                        title="Go to Details"
                        onPress={() => this.props.navigation.navigate('Details')}
                    />
                </View>*/}
            </>
        );
    }
}