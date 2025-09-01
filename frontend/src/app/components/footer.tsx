"use client";

import React from "react";
import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#036424] to-[#a3d921] text-white mt-auto">
      <div className="container mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">GradeFresh</h3>
            <p className="mb-4 text-white/90">
              Fresh, organic fruits delivered straight to your doorstep. 
              Join our community of fruit lovers today!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#a3d921] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#a3d921] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#a3d921] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#a3d921] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-white/80 hover:text-white transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-white/80 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/80 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/80 hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 flex-shrink-0" />
                <span className="text-white/80">
                  123 GradeFresh<br />
                  Orchard City, OC 90210
                </span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0" />
                <span className="text-white/80">hello@GradeFresh.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold">Subscribe to our newsletter</h4>
              <p className="text-white/80">Get the latest updates on new products and upcoming sales</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-lg focus:outline-none text-black w-full md:w-64 bg-white"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center text-white/70 text-sm">
          <p>© {new Date().getFullYear()} GradeFresh. Made with  for fruit lovers everywhere. Develop By Anjali</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;