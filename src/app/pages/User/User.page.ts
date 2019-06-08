import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { UsersService } from '../../services/Users.service';

@Component({
    selector: 'user-list',
    templateUrl: './User.page.html',
    styleUrls: ['./User.page.css']
})
export class UserPage {
    userForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required)
    })

    private userId: string = '';
    private loading: boolean = false;
    private data: Object = {};
    private users: any = [];
    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) { }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.getUser(this.userId)
        } else {
            let users = this.usersService.listUsers();
            users.snapshotChanges().subscribe(docs => {
                docs.map(doc => {
                    const payloadDoc = doc.payload.doc;
                    this.users.push({ id: payloadDoc.id, ...payloadDoc.data() });
                });
                console.log('Users: ', this.users)
            })
        }
    }

    editUser(user) {
        delete user.id;
        this.userForm.setValue(user);
    }

    // setValue(event) {
    //     const { target } = event;
    //     this.data = {
    //         ...this.data,
    //         [target.name]: target.value,
    //     }
    //     console.log(this.data);
    // }

    private getUser(id: string) {
        console.log('UUID: ', id);
        this.loading = true;
        this.usersService.getById(id)
            .subscribe((data: any) => {
                console.log('User: ', data);
                this.userForm.setValue(data);
                this.loading = false;
            })
    }

    createUser() {
        this.loading = true;
        this.usersService.createOrUpdate(this.userForm.value, this.userId)
            .then(() => this.loading = false)
            .catch((err) => this.loading = false)
        // .then((data) => {
        //     console.log('result', data);
        //     this.loading = false;
        // }).catch((err) => {
        //     console.log('erro', err);
        //     this.loading = false;
        // });
    }
}