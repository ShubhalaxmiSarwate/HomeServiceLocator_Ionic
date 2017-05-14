import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html'
})
export class RequestsPage {

  constructor(public navCtrl: NavController) {

  }
  
    itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(RequestsPage, {
      item: item
    });
  }
  
}
