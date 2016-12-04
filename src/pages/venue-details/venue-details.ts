import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Venue } from '../../models/venue';

import { WdiconfVenues } from '../../providers/wdiconf-venues';


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
  venue: Venue;
  id: string;

  ionViewDidLoad() {
    console.log('Hello UserDetails Page');
  }
  constructor(public navCtrl: NavController, private navParams: NavParams, private wdiconfVenues: WdiconfVenues) {
    this.id = navParams.get('id');
    console.log(this.venue);
    wdiconfVenues.loadDetails(this.id).subscribe(venue => {
      this.venue = venue[0];
      console.log(venue)
    })
  }

}
