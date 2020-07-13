import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable,of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {baseURL} from '../shared/baseurl';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient) { }
  getPromotions():Observable<Promotion[]>
  {
    return this.http.get<Promotion[]>(baseURL + 'promotions');
    //return of(PROMOTIONS).pipe(delay(2000));
  }
  getPromotion(id:string):Observable<Promotion>{
    return this.http.get<Promotion>(baseURL +'promotions/'+id);
   // return of(PROMOTIONS.filter((promo)=>(promo.id===id))[0]).pipe(delay(2000));

  }
  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').
    pipe(map(promo=>promo[0]));
    //return of(PROMOTIONS.filter((promo)=>promo.featured)[0]).pipe(delay(2000));
  }
}








/* 
  USING RXJS AND PROMISES
export class PromotionService {

  constructor() { }
  getPromotions():Promise<Promotion[]>
  {
    return of(PROMOTIONS).pipe(delay(2000)).toPromise();
  }
  getPromotion(id:string):Promise<Promotion>{
    return of(PROMOTIONS.filter((promo)=>(promo.id===id))[0]).pipe(delay(2000)).toPromise();

  }
  getFeaturedPromotion():Promise<Promotion>{
    return of(PROMOTIONS.filter((promo)=>promo.featured)[0]).pipe(delay(2000)).toPromise();
  }
}
 */






/*
  USING PROMISES TO TRANSFER DATA
export class PromotionService {

  constructor() { }
  getPromotions():Promise<Promotion[]>
  {
    return Promise.resolve(PROMOTIONS);
  }
  getPromotion(id:string):Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promo)=>(promo.id===id))[0]);

  }
  getFeaturedPromotion():Promise<Promotion>{
    return Promise.resolve(PROMOTIONS.filter((promo)=>promo.featured)[0]);
  }
} */