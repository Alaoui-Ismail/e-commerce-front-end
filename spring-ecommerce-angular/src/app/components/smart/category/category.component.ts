import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  categories$: Category[] = [];
  
  constructor(public categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) {


    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let param = this.route.snapshot.params['id'];
        if (param == "all") {
          this.getAllCategories();
        }
        else if (!(param == "all")) {
          this.getCategoriesByParent();
        }

      }
    })
  }

  ngOnInit(): void {
  }

  public getAllCategories() {
    this.categoryService.getRessources("/category/getAll")
      .subscribe((data) => {
        this.categories$ = data;
      });
  }

  public getCategoriesByParent() {
    this.categoryService.getRessources("/category/getByParent/" + this.route.snapshot.params['id'])
      .subscribe(data => {
        this.categories$ = data;
      })
  }




}
