import React from "react";
import { View } from "react-native";
import { Textarea, Input, Form, Item, Button, Icon, Fab, Text } from "native-base";
import { editNote, deleteNote } from "../api/notes";

export default class DraftScreen extends React.Component {
    state = {
        note: '',
        title: '',
        active: false,
        edit: false,
        editId: undefined,
    };

    onRecognizedText = data => {
        this.setState(() => ({ note: data }));
    };

    onSubmitDraft = async () => {
        const { note, title, edit, editId } = this.state;
        if (edit) {
            const editSubmit = this.props.navigation.getParam('editSubmit');
            await editNote({ note, noteTitle: title, editId }, editSubmit);
            this.setState({note: '', title: '', editId: undefined});
        } else {
            const draftSubmit = this.props.navigation.getParam('draftSubmit');
            if (note.length > 1 && title.length > 1) {
                draftSubmit({note, title});
                this.setState({note: '', title: ''});
            }
        }
    };

    onDeleteDraft = async () => {
        const { editId } = this.state;
        const editSubmit = this.props.navigation.getParam('editSubmit');
        await deleteNote({ editId }, editSubmit);
        this.setState({note: '', title: '', editId: undefined});
    };

    componentDidMount() {
        const editTitle = this.props.navigation.getParam('noteTitle');
        const editId = this.props.navigation.getParam('noteId');
        const editNote = this.props.navigation.getParam('note');
        const edit = this.props.navigation.getParam('note');
        this.setState({ note: editNote, title: editTitle, edit, editId });
    }

    render() {
        const { note, title, edit } = this.state;
        return (
            <View style={{ flex: 1}}>
                <Text>Draft Screen</Text>
                <Form>
                    <Item>
                        <Input placeholder="Title" value={title} onChangeText={text => this.setState({ title: text })} />
                    </Item>
                    <Textarea rowSpan={5} bordered placeholder="Note..." value={note} onChangeText={text => this.setState({ note: text })} />
                    <Button style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 5,
                        paddingBottom: 5
                    }}
                            onPress={() => {
                        this.onSubmitDraft();
                    }}>
                        <Text>Save Draft</Text>
                    </Button>
                    { edit && (<Button style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#d5494d',
                        marginTop: 20,
                        paddingTop: 5,
                        paddingBottom: 5
                    }}
                                      onPress={() => {
                                          this.onDeleteDraft();
                                      }}>
                        <Text>Delete Draft</Text>
                    </Button>) }
                </Form>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="info" />
                    <Button style={{ backgroundColor: '#DD5144' }}
                        onPress={() => {
                            this.props.navigation.navigate('Recognizer', {
                                onRecognized: this.onRecognizedText,
                            })
                        }}
                    >
                        <Icon name="camera" />
                    </Button>
                </Fab>
            </View>
        );
    }
};