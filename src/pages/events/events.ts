import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Event } from '../../models/event';
import { WdiconfEvents } from '../../providers/wdiconf-events';
import { EventDetailsPage } from '../event-details/event-details';


/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  today;
  events: Event[];

  constructor(public navCtrl: NavController, private wdiconfEvents: WdiconfEvents) {
    this.today = new Date().toISOString();
    wdiconfEvents.load().subscribe(events => {
      this.events = events;
    })
  }

  ionViewDidLoad() {
    console.log('Hello EventsPage Page');
  }

  dateChange(dateEvent) {
    var dateParsed = dateEvent.year.text + dateEvent.month.text + dateEvent.day.text;
    this.wdiconfEvents.loadForDate(dateParsed).subscribe(events => {
      this.events = events;
    });
  }

  goToDetails(id: number) {
    this.navCtrl.push(EventDetailsPage, {id});
  }

}
