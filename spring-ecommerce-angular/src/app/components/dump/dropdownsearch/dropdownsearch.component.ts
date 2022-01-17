import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoryService } from 'src/app/services/categories.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-dropdownsearch',
  templateUrl: './dropdownsearch.component.html',
  styleUrls: ['./dropdownsearch.component.css']
})
export class DropdownsearchComponent implements OnInit {

  currentUser$: null = null;
  Parentcategories = ["High-Tech", "Perfumes", "Home"];
  balance: boolean = false;

  @Output() searchEvent = new EventEmitter<string>();

  @Input() drpSearch: any;

  show: boolean = false;
  constructor(private accountService: AccountService,
    private tokenService: TokenService,
    private router: Router,
    public loaderService: LoaderService,
    public articleService: ArticlesService,
    private route: ActivatedRoute,
  ) {

  }


  ngOnInit(): void {

    this.accountService.authStatus.subscribe(() => {
      this.currentUser$ = this.tokenService.getInfos();
    })

  }

  newSearchByName(value: string) {
    this.searchEvent.emit(value);
  }


  // x:any;
  y: boolean=false;
  addJsCode() {
    let test = document.querySelectorAll('.dropdown ul');
    test.forEach((x) => {
      x.classList.add('active');
      if(x.classList.contains('active')){
        console.log("active ",test.length ,`${x.classList.contains('active')}`);
      
       // this.y!=this.y;
      }
      //  x.classList.remove('active');
    }
    
    );

   
    //document.querySelector(".dropdown ul")!.classList.remove('active');

    // this.onClick();
  }

  addJsCode1(item: any, i: number) {
    document.querySelectorAll(".default_option").forEach
      ((y: any) => {

        console.log(item, i + 1);
        var c = i + 1;
        y.innerText = item;
        this.router.navigateByUrl('/categories/' + c);
        document.querySelector(".dropdown ul")!.classList.remove('active');
      })
  }



  onClick() {
    if (this.show)
      return this.show = false
    else
      this.show = true;

    return null;

  }



}
