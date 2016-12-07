declare var Stripe;
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, Response} from '@angular/http';

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

  constructor(public navCtrl: NavController, public http:Http) {

  }

  ionViewDidLoad() {
    console.log('Hello PurchasePage Page');
  }
  logForm() {
    var data = {};
    var url = 'https://wdiconfapi.herokuapp.com/payment';
    var self = this;
    Stripe.card.createToken(this.card, function(status, response) {
      if (response.error) {
        console.log("Error")
      }
      else {
        var token = response.id;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var token_obj = { stripeToken: token }
        new Promise(resolve => {
            self.http.post('http://localhost:3000/payment', token_obj, headers).subscribe(data => {
                if(data){
                  console.log(data.json())
                  if (data.json().success) {
                    
                  }
                  resolve(true);
                }
                else
                  resolve(false);
                  return (data.json);
            });
        });
      }
    });
  }

}