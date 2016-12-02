import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello PresentersPage Page');
  }

}
