export interface IGoods extends Map {
  article: number;
  name: string;
	brand: string;
	price: number;
	isExists: boolean;
}
export interface ITableHeader {
	name: string;
	class: string;
}
interface Map {
  [key: string]: string | number | boolean | undefined;
}