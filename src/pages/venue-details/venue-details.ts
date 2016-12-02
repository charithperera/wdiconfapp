import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the VenueDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-venue-details',
  templateUrl: 'venue-details.html'
})
export class VenueDetailsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello VenueDetailsPage Page');
  }

}
