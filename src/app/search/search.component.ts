import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  serachproduct: undefined | product[]
  NoProductErrors: String = '';
  constructor(private Activerout: ActivatedRoute, private productserv: ProductService) { }

  ngOnInit() {
    let query = this.Activerout.snapshot.paramMap.get('query')
    console.warn(query)
    query && this.productserv.SearchProducts(query).subscribe((result) => {

      if (result.length > 0) {
        this.serachproduct = result;
        this.NoProductErrors = '';
        console.warn('result', result)

      } else {
        this.serachproduct = [];
        this.NoProductErrors = 'No Product';
        console.log('NoProductErrors:', this.NoProductErrors);
      }

    })
  }

}
