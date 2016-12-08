import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Event } from '../../models/event';
import { WdiconfEvents } from '../../providers/wdiconf-events';
import { EventDetailsPage } from '../event-details/event-details';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  today;
  events: Event[];



  constructor(public navCtrl: NavController, private wdiconfEvents: WdiconfEvents) {
    this.today = new Date().toISOString();
    wdiconfEvents.loadUpNext().subscribe(events => {
      this.events = events;
    })
  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }


    goToDetails(id: number) {
      this.navCtrl.push(EventDetailsPage, {id});
    }

}
