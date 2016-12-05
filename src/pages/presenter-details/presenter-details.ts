import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Presenter } from '../../models/presenter';
import { Event } from '../../models/event';
import { WdiconfPresenters } from '../../providers/wdiconf-presenters';
import { WdiconfEvents } from '../../providers/wdiconf-events';
import { EventDetailsPage } from '../event-details/event-details';


@Component({
  selector: 'page-presenter-details',
  templateUrl: 'presenter-details.html'
})
export class PresenterDetailsPage {
  presenter: Presenter;
  presenterEvents: Event[];
  presenter_id: number;

  constructor(public navCtrl: NavController, private navParams: NavParams, private wdiconfPresenters: WdiconfPresenters, private wdiconfEvents: WdiconfEvents) {
    this.presenter_id = navParams.get('id');
    wdiconfPresenters.loadDetails(this.presenter_id).subscribe(presenter => {
      this.presenter = presenter;
    })
    wdiconfEvents.loadForPresenter(this.presenter_id).subscribe(events => {
      this.presenterEvents = events;
    })
  }

  goToEvent(id: string) {
    this.navCtrl.push(EventDetailsPage, {id});
  }

  ionViewDidLoad() {
    console.log('Hello PresenterDetailsPage Page');
  }

}
