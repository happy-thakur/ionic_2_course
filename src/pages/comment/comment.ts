import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, public viewCtrl: ViewController) {
      
      this.comment = this.formBuilder.group({
        author: ["", Validators.required],
        rating: 5,
        comment: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  onSubmit() {
    console.log(this.comment.value);
    this.comment.value['date'] = new Date() + "";
    this.viewCtrl.dismiss(this.comment.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
