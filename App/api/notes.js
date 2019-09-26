import firebase from 'react-native-firebase'
const shortid = require('shortid')

export function addNote(data, addComplete) {
	console.log(data, 'DATA')
	try {
		firebase
			.firestore()
			.collection('Notes')
			.add({
				noteId: shortid.generate(),
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

export async function editNote(data, addComplete) {
	try {
		const snapshot = await firebase
			.firestore()
			.collection('Notes')
			.where('noteId', '==', data.editId)
			.get()
		const updated = snapshot.docs.map((doc) => {
			firebase
				.firestore()
				.collection('Notes')
				.doc(doc.id)
				.update({
					noteTitle: data.noteTitle,
					note: data.note,
					createdAt: new Date(),
				})
		})

		await Promise.all(updated)

		await getNotes(addComplete)
	} catch (e) {
		console.log(e)
	}
}

export async function deleteNote({ editId }, addComplete) {
	try {
		const snapshot = await firebase
			.firestore()
			.collection('Notes')
			.where('noteId', '==', editId)
			.get()
		const updated = snapshot.docs.map((doc) => {
			doc.ref.delete()
		})

		await Promise.all(updated)

		await getNotes(addComplete)
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
