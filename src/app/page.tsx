import HomePage from "../views/HomePage";
import { getProducts, getEvents, getForumPosts } from "../lib/catalog";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();
  const events = await getEvents();
  const forumPosts = await getForumPosts();

  return <HomePage products={products} events={events} forumPosts={forumPosts} />;
}