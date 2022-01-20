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
  public articlesList: Array<any> = [];
  public cartList: Array<any> = [];
  public result: any;
  public list: any;
  setFavorites: void;


  constructor(public articleService: ArticlesService,
    private cartService: CartService,
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
    console.log("init", localStorage.getItem('favorites'));

    JSON.parse(localStorage.getItem('favorites'));
  }


  public getArticlesByCategory() {
    this.articleService.getRessources("/articles/getByCategory/" + this.route.snapshot.params['id'])
      .subscribe(data => {
        console.log(data);
        this.searchProducts$ = this.articles$ = data;

        var elements = JSON.parse(localStorage.getItem('favorites'));
        this.list = elements;
        console.log("Local Storage", this.list)
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
    console.log("article add to cart");
    const theCartItem = new Cart(product);
    console.log("article componenet");
    this.cartService.addToCart(theCartItem);
    // this.cartService.addToCart(theCartItem).subscribe(res => {
    //   console.log("response ", res);
    // },
    //   (error) => {
    //     console.log("error", error);
    //   });

    // const bodyCart = {
    //   'name': product.articleName,
    //   'description': product.articleDescription,
    //   'price': product.articlePrice,
    //   'image': product.imageName
    // }
    // this.cartList = JSON.parse(localStorage.getItem('shopping'));
    // this.cartList.push(bodyCart);
    // localStorage.setItem('shopping', JSON.stringify(this.cartList));
    // console.log("items", this.cartList);
  }

  // public check(article: any) {


  //   var exists = localStorage.getItem('favorites');

  //   if (exists) {

  //     console.log('local favorite exists');
  //     this.list = exists;
  //     if (this.list.some((x: any) => x.id === article.articleId)) {
  //       return true;
  //     }
  //   } else {
  //     console.log('loacal is not found');
  //   }





  // }

  public check(article: any) {

    var elements = JSON.parse(localStorage.getItem('favorites'));

    this.list = elements;

    if (this.list.some((x: any) => x.id === article.articleId)) {

      return true;

    }

  }


  // favoris function
  public favorite(article: any) {


    article.isSelected = !article.isSelected;

    var favoris = {
      'id': article.articleId,
      'name': article.articleName,
      'description': article.articleDescription,
      'price': article.articlePrice,
      'image': article.articleImage,
    };

    // localStorage.setItem('favorites', JSON.stringify(this.articlesList));
    if (article.isSelected) {
      console.log("selecteeeeed");

      this.articlesList = JSON.parse(localStorage.getItem('favorites'));

      if (!(this.articlesList.some((x: any) => x.id === article.articleId))) {

        localStorage.setItem('entry', JSON.stringify(favoris));
        console.log("before push");
        this.articlesList.push(favoris);

        localStorage.setItem('favorites', JSON.stringify(this.articlesList));

      }
    }

    else if (!article.isSelected) {

      console.log("unselecteeeeeed");

      this.result = this.articlesList.filter(obj => {
        return obj.id === article.articleId;
      })


      this.articlesList = JSON.parse(localStorage.getItem('favorites'));
      let index = this.articlesList.findIndex(d => d.id === article.articleId);
      console.log(index);

      this.articlesList.splice(index, 1);

      localStorage.setItem('favorites', JSON.stringify(this.articlesList));

    }

  }




}