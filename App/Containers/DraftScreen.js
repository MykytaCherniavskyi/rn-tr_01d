import React from "react";
import { View } from "react-native";
import { Textarea, Input, Form, Item, Button, Icon, Fab, Text } from "native-base";

export default class DraftScreen extends React.Component {
    state = {
        note: '',
        title: '',
        active: false,
    };

    onRecognizedText = data => {
        this.setState(() => ({ note: data }));
    };

    onSubmitDraft = () => {
        const draftSubmit = this.props.navigation.getParam('draftSubmit');
        const { note, title } = this.state;
        if (note.length > 1 && title.length > 1) {
            draftSubmit({ note, title });
            this.setState({ note: '', title: '' });
        }
    };

    render() {
        const { note } = this.state;
        console.log(note);
        return (
            <View style={{ flex: 1}}>
                <Text>Draft Screen</Text>
                <Form>
                    <Item>
                        <Input placeholder="Title" onChangeText={text => this.setState({ title: text })} />
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