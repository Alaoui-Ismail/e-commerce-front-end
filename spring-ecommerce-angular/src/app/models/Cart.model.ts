import { Product } from "./Product";

export class Cart {


    
    id:number ;
    name:string;
    description:string;
    price:number;
    imageName:string;
    quantity:number;

  

    constructor(p:Product){
        this.id = p.articleId;
        this.name = p.articleName;
        this.description = p.articleDescription;
        this.price = p.articlePrice;
        this.imageName = p.articleName;
        this.quantity = p.articleQuantity;
    }
}
