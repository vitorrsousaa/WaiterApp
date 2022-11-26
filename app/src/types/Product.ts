export interface Product {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: string;
  ingredients: {
    name: string;
    icon: string;
    _id: string;
  }[];
  category: string;
  __v: number;
}
