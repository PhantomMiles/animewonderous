import ShopPage from '../../views/ShopPage';
import { getProducts } from '../../lib/catalog';

export const dynamic = 'force-dynamic';

export default async function Shop() {
  const products = await getProducts();

  return (
    <ShopPage products={products} />
  );
}
