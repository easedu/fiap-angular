import { Component } from '@angular/core';

import { UsersService } from '../../services/Users.service';

@Component({
    selector: 'user-list',
    templateUrl: './User.page.html',
    styleUrls: ['./User.page.css']
})
export class UserPage {
    private loading: boolean = false;
    constructor(
        private usersService: UsersService
    ) {}

    createUser() {
        this.loading = true;
        this.usersService.create({
            name: 'Eduardo',
            email: 'edu@gmail.com',
            age: 30,
            phone: '+5511987654321'
        }).then((data) => {
            console.log('result', data);
            this.loading = false;
        }).catch((err) => {
            console.log('erro', err);
            this.loading = false;
        });
    }
}