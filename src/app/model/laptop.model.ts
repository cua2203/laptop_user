export interface Ilaptop{
    id:number;
    laptop_name:string;
    image:string;
    category_id:number;
    brand_id:number;
    status:boolean
}
export interface IgetPagination{
    data: IGetLaptop[];
    totalPage: number
}

export interface IGetLaptop{
    id:number;
    laptop_name:string;
    status:boolean
   
    image:string;
    category_name:string;
    brand_name:string;
}
export interface IAddLaptop{
    laptop_name:string;
    image:string;
    category_id:number;
    brand_id:number;
    ram :string;
    storage : string; 
    cpu : string;
    description :string; 
    pin : string;
}



export interface IVariant{
    variant_id :number; 
    laptop_id: number; 
    image :string; 
    hidden: boolean; 
    price :number; 
    quantity:number;
    ram :string;
    storage : string; 
    cpu : string;
    description :string; 
    pin : string;

}

export interface IGetVariant{
    variant_id :number; 
    laptop_name:string; 
    image :string; 

    price :number; 
    quantity:number;
    ram :string;
    storage : string; 
    cpu : string;
    description :string; 
    pin : string;

}

export interface Ipagination{
    searchString:string;
    pageIndex:number;
    pageSize:number;
    sort:number;
    isActive: number
}