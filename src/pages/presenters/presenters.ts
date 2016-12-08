import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Presenter } from '../../models/presenter';
import { WdiconfPresenters } from '../../providers/wdiconf-presenters';

import { PresenterDetailsPage } from '../presenter-details/presenter-details';

/*
  Generated class for the Presenters page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-presenters',
  templateUrl: 'presenters.html'
})
export class PresentersPage {
  presenters: Presenter[];
  originalPresenters: Presenter[];

  constructor(public navCtrl: NavController, private wdiconfPresenters: WdiconfPresenters) {
    wdiconfPresenters.load().subscribe(presenters => {
      this.presenters = presenters;
      this.originalPresenters = presenters;
    })
  }

  ionViewDidLoad() {
    console.log('Hello PresentersPage Page');
  }

  goToDetails(id: string) {
    this.navCtrl.push(PresenterDetailsPage, {id});
  }

  search(searchEvent) {
    var term = searchEvent.target.value
    if (term.trim() === '' || term.trim().length < 1) {
      this.presenters = this.originalPresenters;
    } else {
      this.wdiconfPresenters.searchPresenters(term).subscribe(presenters => {
        this.presenters = presenters;
      });
    }
  }

}
