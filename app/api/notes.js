import firebase from "react-native-firebase";

export function addNote(note, addComplete) {

    firebase.firestore()
        .collection('Notes')
        .add({
            noteTitle: note.title,
            note: note.data,
            createdAt: firebase.firestore().restore.FieldValue.serverTimestamp()
        })
        .then(snapshot => snapshot.get())
        .then(notes => addComplete(notes.data()))
        .catch(e => console.log(e));

}

export async function getNotes(notesRetreived) {
    const notes = [];

    let snapshot = await firebase.firestore()
        .collection('Notes')
        .orderBy('createdAt')
        .get();

    snapshot.forEach(doc => {
        notes.push(doc.data());
    });
    console.log(notes);
    notesRetreived(notes);
}