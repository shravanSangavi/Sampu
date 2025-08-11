import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private product: ProductService) { }
  Papularproducts:undefined|product[];
  trendyProducts:undefined|product[];

  ngOnInit(): void {

   this.product.Papularproducts().subscribe((data)=>{
  this.Papularproducts=data;
   })
 this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })

  }
}
