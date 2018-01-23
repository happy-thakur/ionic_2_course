import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LeaderProvider } from '../../providers/leader/leader';
import { Leader } from '../../shared/leader';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams,
        private leaderProvider: LeaderProvider,
        @Inject('BaseURL') private BaseURL) {
  }

  leaders: Leader[];
  errMess: string;
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  ngOnInit() {
    this.leaderProvider.getLeaders().subscribe((data) => {
      this.leaders = data;
    },
    err => this.errMess = <any>err);
  }

}
