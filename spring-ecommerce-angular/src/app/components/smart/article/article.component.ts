import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';

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
      .includes(query.toLocaleLowerCase())) : this.articles$ ;
      
    // console.log(this.searchProducts$);
  }



}
