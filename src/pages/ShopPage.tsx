'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  ArrowUpDown,
  Filter,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import Image from 'next/image';

const ITEMS_PER_PAGE = 12;

type Props = {
  products: any[];
};

export default function ShopPage({ products }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Extract categories dynamically from products
  const categories = useMemo(() => {
    const rawCategories = products.map((p) => p.category).filter(Boolean);
    const uniqueCategories = Array.from(new Set(rawCategories));
    return ['All', ...uniqueCategories];
  }, [products]);

  // Calculate highest price for the range filter
  const highestProductPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price || 0), 500000);
  }, [products]);

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (activeCategory !== 'All') {
      list = list.filter(
        (product) =>
          product.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by Search Term
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q)
      );
    }

    // Filter by Price Range
    list = list.filter((p) => p.price <= maxPrice);

    // Sorting Logic
    list.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'newest') return String(b.id).localeCompare(String(a.id));
      return 0; // 'featured' retains mockData order
    });

    return list;
  }, [activeCategory, searchQuery, maxPrice, sortBy, products]);

  // Pagination Logic (Limit 12 per page)
  const totalPages =
    Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8">
        {/* Top Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-display uppercase tracking-wider">
              STORE & CATALOG
            </h1>
            <p className="text-text-secondary mt-1 text-sm">
              Discover premium authentic figures, apparel, COD passes, and collectibles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-8 py-2 bg-surface border border-border/80 rounded-xl text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-surface border border-border/80 rounded-xl px-3 py-2">
              <ArrowUpDown className="h-4 w-4 text-text-muted shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs text-foreground focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-surface">Featured</option>
                <option value="price-low" className="bg-surface">Price: Low to High</option>
                <option value="price-high" className="bg-surface">Price: High to Low</option>
                <option value="rating" className="bg-surface">Highest Rated</option>
                <option value="newest" className="bg-surface">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Category Filter Box */}
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4 text-primary" />
                <h3 className="font-display text-base uppercase tracking-wider">Categories</h3>
              </div>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-primary text-foreground font-bold shadow-md shadow-primary/20'
                          : 'text-text-secondary hover:bg-surface-elevated hover:text-foreground'
                      }`}
                    >
                      <span>{cat}</span>
                      {isActive && <span className="h-2 w-2 rounded-full bg-foreground" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Box */}
            <div className="bg-surface/80 rounded-3xl border border-border/60 p-6 shadow-xl space-y-4">
              <h3 className="font-display text-base uppercase tracking-wider">
                Max Price: ₦{maxPrice.toLocaleString()}
              </h3>
              <input
                type="range"
                className="w-full accent-primary cursor-pointer"
                min="1000"
                max={highestProductPrice}
                step="5000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
              />
              <div className="flex justify-between text-xs text-text-muted font-medium">
                <span>₦1,000</span>
                <span>₦{highestProductPrice.toLocaleString()}</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Filter Summary Header */}
            <div className="flex justify-between items-center text-xs text-text-muted">
              <span>
                Showing <strong className="text-foreground">{paginatedProducts.length}</strong> of{' '}
                <strong className="text-foreground">{filteredAndSortedProducts.length}</strong> items
              </span>
              {(activeCategory !== 'All' || searchQuery || maxPrice < highestProductPrice) && (
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                    setMaxPrice(highestProductPrice);
                    setCurrentPage(1);
                  }}
                  className="text-primary hover:underline font-bold"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => {
                  const name = product.name;
                  const image = product.images?.[0] || '/merch/shibuya-fest-hoodie-1.jpg';
                  const badgeTag = product.tags?.[0];

                  return (
                    <div
                      key={product.id}
                      className="bg-surface/80 rounded-3xl border border-border/60 overflow-hidden group hover:border-primary/50 transition-all flex flex-col justify-between shadow-xl"
                    >
                      <div>
                        <div className="relative aspect-square overflow-hidden bg-background">
                          <Image
                            src={image}
                            alt={name}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {badgeTag && (
                            <div className="absolute top-4 left-4">
                              <Badge variant="primary" className="text-[10px] font-bold uppercase bg-primary text-black">
                                {badgeTag}
                              </Badge>
                            </div>
                          )}
                        </div>

                        <div className="p-5 space-y-2">
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-xs font-bold text-foreground">
                              {product.rating || '5.0'}
                            </span>
                          </div>
                          <h3 className="font-display text-base group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-wider">
                            {name}
                          </h3>
                          <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex items-center justify-between border-t border-border/40 mt-4">
                        <span className="text-lg font-bold text-foreground font-display">
                          {product.currency || '₦'}{product.price.toLocaleString()}
                        </span>
                        <Link href={`/shop/${product.id}`}>
                          <Button size="sm" variant="outline" className="gap-1 text-xs cursor-pointer hover:bg-primary hover:text-white">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-surface/40 rounded-3xl border border-border p-12 text-center my-8">
                <SlidersHorizontal className="h-12 w-12 text-text-muted mx-auto mb-3 opacity-30" />
                <h3 className="font-display text-lg mb-1">No products match your criteria</h3>
                <p className="text-xs text-text-secondary mb-6">
                  Try adjusting your category selection or increasing the price limit.
                </p>
                <Button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                    setMaxPrice(highestProductPrice);
                    setCurrentPage(1);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination Numeration Bar (Limit 12 per page) */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-2 pt-6 border-t border-border/60">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 w-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === page
                          ? 'bg-primary text-foreground font-extrabold shadow-md shadow-primary/20 scale-105'
                          : 'bg-surface border border-border/60 text-text-secondary hover:text-foreground'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="gap-1"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}