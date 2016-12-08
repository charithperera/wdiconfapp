declare var Stripe;
import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, Response} from '@angular/http';
import { HomePage } from '../../home/home';
import { ProfilePage } from '../../pages/profile/profile';


import 'rxjs/add/operator/map';

/*
  Generated class for the Purchase page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html'
})
export class PurchasePage {

  card = {};
  ticketNumber;
  hasTicket: boolean = false;
  loggedIn: boolean = false;
  paymentError: string = '';
  buttonDisabled: boolean = null;

  constructor(public navCtrl: NavController, public http: Http, private _ngZone: NgZone) {
    if (window.localStorage.getItem('wdiConfToken') !== null) {
      this.loggedIn = true;
      this.checkTicket();
    }
  }

  checkTicket() {
    var headers = new Headers();
    var auth = 'Bearer ' + window.localStorage.getItem('wdiConfToken');

    headers.append('Authorization', auth);
    new Promise(resolve => {
       this.http.get('https://wdiconfapi.herokuapp.com/checkforticket', {headers: headers}).subscribe(data => {
           if(data){
             if (data.json().ticket) {
               this.hasTicket = true;
               this.ticketNumber = data.json().ticketNumber;
             }
             resolve(true);
           }
           else {
             resolve(false);
           }
       });
    });
  }

  ionViewDidLoad() {
    console.log('Hello PurchasePage Page');
  }
  logForm() {
    var data = {};
    var url = 'https://wdiconfapi.herokuapp.com/payment';
    var self = this;
    var success = false;
    this.buttonDisabled = true;
    Stripe.card.createToken(this.card, function(status, response) {
      if (response.error) {
        // need to show errorpage
        self._ngZone.run(() => {
          self.paymentError = response.error.message;
          self.buttonDisabled = null;
        });
      }
      else {
        var token = response.id;
        var headers = new Headers();
        var auth = 'Bearer ' + window.localStorage.getItem('wdiConfToken');
        headers.append('Authorization', auth);
        var token_obj = { stripeToken: token }
        new Promise(resolve => {
            self.http.post('https://wdiconfapi.herokuapp.com/payment', token_obj, {headers: headers}).subscribe(data => {
                if(data){
                  console.log(data.json());
                  if (data.json().success) {
                    self._ngZone.run(() => {
                      self.checkTicket();
                    });
                  }
                  resolve(true);
                }
                else {
                  resolve(false);
                }
            });

        });
      }
    });
  }
}
