import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import uuid from 'uuid';

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(
        private db: AngularFirestore
    ) { }

    getById(id: string) {
        return this.db.collection('users').doc(id).valueChanges();
    }

    createOrUpdate(data, id) {
        // let docId = "";
        // if (id) {
        //     docId = id;
        // } else {
        //     docId = uuid();
        // }
        return this.db.collection('users').doc(id ? id : uuid()).set(data);
    }

    listUsers() {
        // let users = [];
        // this.db.collection("cities").get()
        //     .then(function (querySnapshot) {
        //         querySnapshot.forEach(function (doc) {
        //             // doc.data() is never undefined for query doc snapshots
        //             console.log(doc.id, " => ", doc.data());
        //         });
        //     });
        return this.db.collection("users");
    }
}