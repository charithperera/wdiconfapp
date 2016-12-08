declare var Stripe;
import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
  loading = this.loadingController.create({ content: "Please wait" });

  constructor(public navCtrl: NavController, public http: Http, private loadingController: LoadingController, private _ngZone: NgZone) {


    if (window.localStorage.getItem('wdiConfToken') !== null) {
      this.loading.present();
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
             this.loading.dismiss();
             resolve(true);
           }
           else {
             this.loading.dismiss();
             resolve(false);
           }
       })
    })
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
      var paymentLoading = self.loadingController.create({ content: "Please wait" });
      paymentLoading.present();
      if (response.error) {
        // need to show errorpage
        self._ngZone.run(() => {
          self.paymentError = response.error.message;
          paymentLoading.dismiss();
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
                    paymentLoading.dismiss();
                  }
                  resolve(true);
                }
                else {
                  paymentLoading.dismiss();
                  resolve(false);
                }
            });

        });
      }
    });
  }
}
