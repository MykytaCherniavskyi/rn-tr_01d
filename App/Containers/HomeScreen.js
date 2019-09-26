import React from 'react';
import {Button, View, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, RefreshControl} from "react-native";
import {Input, Item, Label, List, ListItem, Text, CardItem} from "native-base";
import { SwipeListView } from 'react-native-swipe-list-view';

import {addNote, getNotes} from '../api/notes';
import { signOut } from "../api/auth";

function wait(timeout, callback) {
    return new Promise(resolve => {
        setTimeout(async () => {
            await getNotes(callback);
            resolve();
        }, timeout);
    });
}

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
        refreshing: false,
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

    onEditNote = data => {
        const { item: { noteTitle, note, noteId } } = data;
        this.props.navigation.navigate('Draft', {
            draftSubmit: this.onDraftSubmit,
            editSubmit: this.onNotesReceived,
            edit: true,
            noteTitle,
            noteId,
            note,
        });
    };

    onRefresh = () => {
        this.setState(state => {
            const { refreshing } = state;
            return { refreshing: !refreshing };
        }, () => {
            wait(2000, this.onNotesReceived).then(() => this.setState({ refreshing: false }));
        })
    };

    render() {
        const {notes, currentNote, refreshing} = this.state;
        console.log(notes, currentNote);
        return (
            <>
                <View style={{ flex: 2 }}>
                    <View>
                        <Button title={'Add note'} onPress={() => {
                            this.props.navigation.navigate('Draft', {
                                draftSubmit: this.onDraftSubmit,
                            });
                        }} />
                    </View>
                    <SafeAreaView>
                        <ScrollView refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
                        }>
                            <SwipeListView
                                style={{ paddingTop: 5, paddingRight: 10, paddingBottom: 10, paddingLeft: 10 }}
                                data={notes}
                                renderItem={ (data) => (
                                    <TouchableHighlight onPress={() => this.onEditNote(data)}>
                                        <CardItem style={{ borderBottomWidth: 1 }}>
                                            <Text>{data.item.note}</Text>
                                        </CardItem>
                                    </TouchableHighlight>
                                )}
                            />
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    rowFront: {
        // alignItems: 'center',
        // backgroundColor: '#CCC',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        // justifyContent: 'center',
        // height: 50,
    },
    rowBack: {
        // alignItems: 'center',
        // backgroundColor: '#DDD',
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingLeft: 15,
    },
});