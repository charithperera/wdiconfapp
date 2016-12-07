declare var Stripe;
import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, Response} from '@angular/http';
import { HomePage } from '../../home/home';

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

  constructor(public navCtrl: NavController, public http: Http, private _ngZone: NgZone) {
    this.checkTicket();
    console.log(this);
  }

  checkTicket() {
    var headers = new Headers();
    var auth = 'Bearer ' + window.localStorage.getItem('wdiConfToken');
    // this.hasTicket = false;

    headers.append('Authorization', auth);
    new Promise(resolve => {
       this.http.get('http://localhost:3000/checkforticket', {headers: headers}).subscribe(data => {
           if(data){
             if (data.json().ticket) {
               console.log("HELLOOOO");
               this.hasTicket = true;
               this.ticketNumber = data.json().ticketNumber
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
    Stripe.card.createToken(this.card, function(status, response) {
      if (response.error) {
        console.log("Error")
      }
      else {
        var token = response.id;
        var headers = new Headers();
        var auth = 'Bearer ' + window.localStorage.getItem('wdiConfToken');
        headers.append('Authorization', auth);
        var token_obj = { stripeToken: token }
        new Promise(resolve => {
            self.http.post('http://localhost:3000/payment', token_obj, {headers: headers}).subscribe(data => {
            // self.http.post('http://localhost:3000/payment', token_obj, headers).subscribe(data => {
                if(data){
                  console.log(data.json());
                  if (data.json().success) {
                    // self.checkTicket();
                    self._ngZone.run(() => {
                      self.checkTicket();
                    });
                  }
                  resolve(true);
                  // self.checkTicket();
                }
                else {
                  resolve(false);
                  // self.checkTicket();
                }
            });

        });
      }
    });
    console.log(self);
  }
}
