import ShopPage from '../../pages/ShopPage';
import { getProducts } from '../../lib/catalog';

export default async function Shop() {
  const products = await getProducts();

  return (
    <ShopPage products={products} />
  );
}
