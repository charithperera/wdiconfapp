import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the PresenterDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-presenter-details',
  templateUrl: 'presenter-details.html'
})
export class PresenterDetailsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello PresenterDetailsPage Page');
  }

}
