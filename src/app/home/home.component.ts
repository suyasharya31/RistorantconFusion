import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../services/promotion.service';
import {DishService} from '../services/dish.service';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion:Promotion;
  leader:Leader;
  constructor(private promoservice:PromotionService,private dishservice:DishService,private leaderservice:LeaderService) {
   }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish().subscribe((dish)=>this.dish=dish);
    this.promoservice.getFeaturedPromotion().subscribe((promotion)=>this.promotion=promotion);
    this.leaderservice.getFeaturedleader().subscribe((leader)=>this.leader=leader);
  }

}
