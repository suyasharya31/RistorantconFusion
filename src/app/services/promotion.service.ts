import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable,of} from 'rxjs';
import {delay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  getPromotions():Observable<Promotion[]>
  {
    return of(PROMOTIONS).pipe(delay(2000));
  }
  getPromotion(id:string):Observable<Promotion>{
    return of(PROMOTIONS.filter((promo)=>(promo.id===id))[0]).pipe(delay(2000));

  }
  getFeaturedPromotion():Observable<Promotion>{
    return of(PROMOTIONS.filter((promo)=>promo.featured)[0]).pipe(delay(2000));
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