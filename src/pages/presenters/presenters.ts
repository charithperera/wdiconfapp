import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Presenter } from '../../models/presenter';
import { WdiconfPresenters } from '../../providers/wdiconf-presenters';

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

  constructor(public navCtrl: NavController, private wdiconfPresenters: WdiconfPresenters) {
    wdiconfPresenters.load().subscribe(presenters => {
      this.presenters = presenters;
    })
  }

  ionViewDidLoad() {
    console.log('Hello PresentersPage Page');
  }

}
