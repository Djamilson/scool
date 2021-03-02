export default interface IOrder {
  id: string;
  course_id: string;
  subtotal: string;
  order_id: string;
  price: string;
  quantity: string;
  created_at: string;
  updated_at: string;
  course: {
    id: string;
    name: string;
    price: string;
    stock: string;
    image: string;
    created_at: string;
    updated_at: string;
    image_url: string;
    detailUpDow: boolean;
  };
}
