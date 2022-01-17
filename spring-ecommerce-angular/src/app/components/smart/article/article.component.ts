import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Cart } from 'src/app/models/Cart.model';
import { Product } from 'src/app/models/Product';
import { ArticlesService } from 'src/app/services/articles.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  public articles$: any;


  // @Input()
  public searchProducts$: any;


  constructor(public articleService: ArticlesService,
    private cartService : CartService,
    private route: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((val) => {

      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let param = this.route.snapshot.params['id'];
        if (!(param == "all")) {
          this.getArticlesByCategory();
        }
      }

    })
  }

  ngOnInit(): void {
  }


  public getArticlesByCategory() {
    this.articleService.getRessources("/articles/getByCategory/" + this.route.snapshot.params['id'])
      .subscribe(data => {
        console.log(data);
        this.searchProducts$ = this.articles$ = data;
      })
  }



  public searchByName(query: string) {
    console.log(query);
    this.searchProducts$ = (query) ? this.articles$.filter((x: { articleName: any; }) => x.articleName.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase())) : this.articles$;

    // console.log(this.searchProducts$);
  }


  addToCart(product: Product) {
    console.log(`add to cart ${product.articleName} , price = ${product.articlePrice},quantity= ${product.articleQuantity}`);

    const theCartItem = new Cart(product);
    this.cartService.addToCart(theCartItem);

  }


}
