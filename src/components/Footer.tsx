'use client';

import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="mt-40 bg-background border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-bold">AnimeWondrous</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                        <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
                        <Link href="/forum" className="hover:text-primary transition-colors">Forum</Link>
                    </div>
                </div>
            </div>
            <p className="text-center text-muted-foreground">© 2026 AnimeWondrous. All rights reserved.</p>
        </footer>
    );
}