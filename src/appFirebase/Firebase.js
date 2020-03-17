import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAIId2ByN9c0RX9_R71EbJJoV-lB1RDADc",
    authDomain: "test-technique-beeldi.firebaseapp.com",
    databaseURL: "https://test-technique-beeldi.firebaseio.com",
    projectId: "test-technique-beeldi",
    storageBucket: "test-technique-beeldi.appspot.com",
    messagingSenderId: "937748581892"
}

class Firebase {

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.database = firebase.database()
    }

    equipements = () => this.database.ref('Equipments')

    equipement = equipementId => this.database.ref(`Equipments/${equipementId}`)

    checkPointsByEquipementId = equipementId => this.database.ref('Checkpoints').orderByChild('equipmentKey').equalTo(equipementId)
}

export default Firebase
