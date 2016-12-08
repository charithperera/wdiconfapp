import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Venue } from '../../models/venue';
import { WdiconfVenues } from '../../providers/wdiconf-venues';
import { VenueDetailsPage } from '../venue-details/venue-details';

/*
  Generated class for the Venues page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-venues',
  templateUrl: 'venues.html'
})
export class VenuesPage {

  venues: Venue[]
  originalVenues: Venue[];

  constructor(public navCtrl: NavController, private wdiconfVenues: WdiconfVenues) {
    wdiconfVenues.load().subscribe(venues => {
      this.venues = venues;
      this.originalVenues = venues;
})
  }
  ionViewDidLoad() {
    console.log('Hello VenuesDetail Page');
  }
  goToDetails(id: string) {
    this.navCtrl.push(VenueDetailsPage, {id});
  }

  search(searchEvent) {
    var term = searchEvent.target.value
    if (term.trim() === '' || term.trim().length < 1) {
      this.venues = this.originalVenues;
    } else {
      this.wdiconfVenues.searchVenues(term).subscribe(venues => {
        this.venues = venues;
      });
    }
  }


}
