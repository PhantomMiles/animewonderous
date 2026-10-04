import ProductDetailsPage from '../../../pages/ProductDetailsPage';
import { getProductById, getProducts } from '../../../lib/catalog';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { productId: string } }) {
  const { productId } = await params;
  const product = await getProductById(productId);
  if (!product) return notFound();
  const allProducts = await getProducts();
  
  return <ProductDetailsPage product={product} relatedProducts={allProducts} />;
}
