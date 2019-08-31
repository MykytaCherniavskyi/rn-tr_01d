import firebase from "react-native-firebase";

export function signIn({ email, password }) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => console.log(res))
        .catch(console.log);
}

export function signUp({ email, password, displayName }) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userInfo => {
            console.log(userInfo);
            Promise.resolve(userInfo.user.updateProfile({ displayName: displayName.trim() }));
        })
        .catch(console.log);
}

export function subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        authStateChanged(user);
    })
}

export function signOut(onSignOut) {
    firebase.auth().signOut()
        .then(() => {
            console.log('Signed out');
            onSignOut();
        })
}