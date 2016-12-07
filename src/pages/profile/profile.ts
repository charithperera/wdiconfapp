import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserLogin } from '../../providers/user-login';

import { Http, Headers } from '@angular/http';

import { PurchasePage } from '../purchase/purchase';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  login_error: string = '';
  signup_error: string = '';

  loginDetails = {
    email: "",
    password: ""
  }

  signupDetails = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  }

  user = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image_url: 'http://placehold.it/350x350'
  }

  showLogin: boolean = false;
  showSignup: boolean = false;
  showProfile: boolean = false;


  constructor(public navCtrl: NavController, private userLogin: UserLogin, public http: Http) {

    this.checkToken();
    // this.showLogin = true;
    // this.showSignup = true;
    // this.showProfile = true;

  }

  loadSignup() {
    // this.clearSignup();
    this.showLogin = false;
    this.showSignup = true;
    this.showProfile = false;
  }

  loadLogin() {
    // this.clearLogin();
    this.showLogin = true;
    this.showSignup = false;
    this.showProfile = false;
  }

  clearSignup() {
    this.signup_error = '';
    this.signupDetails = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }
  }

  clearLogin() {
    this.login_error = '';
    this.loginDetails = {
      email: "",
      password: ""
    }
  }

  checkToken() {
    this.showProfile = false;
    this.showSignup = false;;
    this.showLogin = false;
    this.clearSignup();
    this.clearLogin()
    if (window.localStorage.getItem('wdiConfToken') !== null) {
      this.loadProfile();
    }
    else {
      this.showLogin = true;
    }

  }

  loadProfile() {
    var headers = new Headers();
      var auth = 'Bearer ' + window.localStorage.getItem('wdiConfToken');

      // headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', auth);

      new Promise(resolve => {
         this.http.get('http://wdiconfapi.herokuapp.com/getinfo', {headers: headers}).subscribe(data => {
             if(data){
               console.log(data.json())
               if (data.json().success) {
                 console.log(data.json().user);
                 this.user = data.json().user;
                 // this.loggedIn = true;
                 // console.log(this.loggedIn);
                // this.showConfirm(data.json().token);
                 // window.localStorage.setItem('wdiConfToken', data.json().token);
                 this.showProfile = true;

               } else {
                 this.showLogin = true;
               }
               resolve(true);
             }
             else {
               this.showLogin = true;
               resolve(false);
             }
               // return (data.json);
         });
      });

  }

  loginForm(form) {
   // this.showConfirm(form.value);
   // console.log(form.value);
   var creds = "email=" + form.value.email + "&password=" + form.value.password;
   var headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');


   new Promise(resolve => {
       this.http.post('http://wdiconfapi.herokuapp.com/authenticate', creds, {headers: headers}).subscribe(data => {
           if(data){
             console.log(data.json())
             if (data.json().success) {
               // this.loggedIn = true;
               // console.log(this.loggedIn);
              // this.showConfirm(data.json().token);
               window.localStorage.setItem('wdiConfToken', data.json().token);
              this.checkToken();
             }
             resolve(true);
             this.login_error = data.json().msg;
             return (data.json());
           }
           else {
             resolve(false);
           }

       });
   });

  }

  signupForm(form) {
   // this.showConfirm(form.value);
   console.log(form.value)
   var creds = "first_name=" + form.value.first_name + "&last_name=" + form.value.last_name + "&email=" + form.value.email + "&password=" + form.value.password;
   var headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');


   new Promise(resolve => {
       this.http.post('http://wdiconfapi.herokuapp.com/signup', creds, {headers: headers}).subscribe(data => {
           if(data){
             if (data.json().success) {
               // this.loggedIn = true;
               // console.log(this.loggedIn);
              // this.showConfirm(data.json().token);
               this.loginForm(form);

             }
             else {
               if (data.json().err.code == 23505) {
                 this.signup_error = "Email already has account";
               }
             }
             resolve(true);
           }
           else {
             resolve(false);
           }

       });
   });

  }

  buyTicket() {
    this.navCtrl.push(PurchasePage);
  }

   logOut() {
     console.log('HI');
     window.localStorage.removeItem('wdiConfToken')
     this.checkToken();
   }

  ionViewDidLoad() {
    console.log('Hello ProfilePage Page');
  }

}
