import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserLogin } from '../../providers/user-login';

import { Http, Headers } from '@angular/http';

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
    this.showLogin = false;
    this.showSignup = true;
    this.showProfile = false;
  }

  loadLogin() {
    this.showLogin = true;
    this.showSignup = false;
    this.showProfile = false;
  }

  checkToken() {
    this.showProfile = false;
    if (window.localStorage.getItem('wdiConfToken') !== null) {
      this.showLogin = false;
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

  // logForm(form) {
  //   var result = this.userLogin.getJwt(form.value)
  //   console.log("hi" + result);
  //
  //
  //   // if (data.json().success) {
  //   // // this.showConfirm(data.json().token);
  //   // window.localStorage.setItem('raja', data.json().token);
  // }

  loginForm(form) {
   // this.showConfirm(form.value);
   console.log(form.value)
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

             }
             resolve(true);
             this.checkToken();
             this.loginDetails = {
                email: "",
                password: ""
              }
             return (data.json);
           }
           else {
             resolve(false);
             this.loginDetails = {
                email: "",
                password: ""
              }
           }
             
       });
   });

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
