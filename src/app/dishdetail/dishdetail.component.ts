import { Component, OnInit,Input,ViewChild } from '@angular/core';
import {Params,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Dish} from '../shared/dish';
import {Comment} from  '../shared/Comment';
import {DishService} from '../services/dish.service';
import {switchMap} from 'rxjs/operators';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective;
  commentForm:FormGroup;
  comments:Comment;
  /* @Input()*/
  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;

  constructor(private dishservice:DishService,private location:Location,
    private router:ActivatedRoute,private fb:FormBuilder) {
      this.createForm();
     }
     ngOnInit(){
      //activated router service provides observable for ex params
      //let id=this.router.snapshot.params['id'];
      this.dishservice.getDishIds()
      .subscribe((dishIds) =>this.dishIds=dishIds);
  
      this.router.params.pipe(switchMap((params:Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish=>{this.dish=dish; this.setPrevNext(dish.id)});
    }
  
     formErrors = {
      'author': '',
      'comment': ''
        };
  
    validationMessages = {
      'author': {
        'required':      'Name is required.',
        'minlength':     'Name must be at least 2 characters long.',
        'maxlength':     'Name cannot be more than 25 characters long.'
      },
      'comment': {
        'required':      'Comment is required.'
        }
      };
    
      createForm()
     {
      this.commentForm=this.fb.group(
        {
          author:['',[Validators.required,Validators.minLength(2)]],
          rating:5,
          comment:['',Validators.required]
          
        }
      );
      this.commentForm.valueChanges
  .subscribe(data => this.onValueChanged(data));

this.onValueChanged();
  
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  } 
  onSubmit()
  {
    this.comments = this.commentForm.value;
    var commentdate=new Date().toISOString();
    this.commentForm.value.date = commentdate;
    this.dish.comments.push(this.comments);
    this.commentForm.reset({
      author:"",
      rating:5,
      comment:""
    });
    this.commentFormDirective.reset();
  }
  setPrevNext(dishId:string)
  {
    const index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length +index - 1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
  }
  goBack():void{
    this.location.back();
  }

}
