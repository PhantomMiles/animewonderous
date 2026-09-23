import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  return (
    <footer className="border-t border-[#26303A] bg-[#050608] pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-black italic tracking-tighter text-[#F12B2B]">
                AW
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none tracking-tight text-white">
                  ANIMEWONDEROUS
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-[#AAB4C0]">
                  ANIME • GAMING • COMMUNITY
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-[#AAB4C0]">
              Enugu&apos;s Home for Anime, Gaming & Youth Culture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm text-[#AAB4C0]">
              <li><Link href="/shop" className="hover:text-[#FF7A00]">Shop</Link></li>
              <li><Link href="/watch" className="hover:text-[#1687FF]">Watch</Link></li>
              <li><Link href="/coden" className="hover:text-[#F12B2B]">CODEN</Link></li>
              <li><Link href="/shibuya" className="hover:text-[#FF7A00]">Shibuya Fest</Link></li>
              <li><Link href="/about" className="hover:text-[#F5F7FA]">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Support</h4>
            <ul className="flex flex-col gap-2 text-sm text-[#AAB4C0]">
              <li><Link href="/support/faq" className="hover:text-[#F5F7FA]">FAQs</Link></li>
              <li><Link href="/support/shipping" className="hover:text-[#F5F7FA]">Shipping & Delivery</Link></li>
              <li><Link href="/support/returns" className="hover:text-[#F5F7FA]">Returns & Refunds</Link></li>
              <li><Link href="/support/contact" className="hover:text-[#F5F7FA]">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-[#AAB4C0] hover:text-white" aria-label="Twitter">
                <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#AAB4C0] hover:text-white" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#AAB4C0] hover:text-white" aria-label="Youtube">
                <FontAwesomeIcon icon={faYoutube} className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#AAB4C0] hover:text-white" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
                </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-[#26303A] py-8 text-xs text-[#AAB4C0] sm:flex-row">
          <p>© {new Date().getFullYear()} Animewonderous. All rights reserved.</p>
          <div className="mt-4 flex gap-4 sm:mt-0">
            <Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
