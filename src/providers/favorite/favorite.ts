import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http,
    private dishservice: DishProvider,
    private localNotifications: LocalNotifications,
    private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
    console.log("this is constr");    
  }


  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)){
      this.favorites.push(id);
      this.storage.set("favorites", this.favorites);
      this.localNotifications.schedule({
        id: id,
        text: 'Dish ' + id + ' added as a favorite successfully'
      });
    }
    console.log('favorites', this.favorites);
    return true;
  }
  
  getFavorites(): Observable<Dish[]> {

    // to get the data initially..
    this.storage.get("favorites")
    .then((data) => {
      console.log(data);
      if(data)
        this.favorites = data;
      else
        this.favorites = [];

      console.log(this.favorites);
    })
    .catch(err => console.log(err));
    console.log(this.favorites);

    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.storage.set("favorites", this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }
}
