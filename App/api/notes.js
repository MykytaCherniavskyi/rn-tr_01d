import firebase from 'react-native-firebase'

export function addNote(data, addComplete) {
	console.log(firebase.firestore.Timestamp)
	try {
		firebase
			.firestore()
			.collection('Notes')
			.add({
				noteTitle: data.title,
				note: data.note,
				createdAt: new Date(),
			})
			.then((snapshot) => snapshot.get())
			.then((notes) => {
				console.log(notes)
				addComplete(notes.data())
			})
			.catch((e) => console.log(e))
	} catch (e) {
		console.log(e)
	}
}

export async function getNotes(notesRetreived) {
	const notes = []

	try {
		let snapshot = await firebase
			.firestore()
			.collection('Notes')
			.get()

		snapshot.forEach((doc) => {
			notes.push(doc.data())
		})
		console.log(notes, 'NOTES')
		notesRetreived(notes)
	} catch (e) {
		console.log(e)
	}
}
