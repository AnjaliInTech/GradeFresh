'use client'

import { useState } from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
  }

  return (
    <header className="bg-[#feffdd] shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-0">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="FruitLens Logo"
            width={130}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className={`${poppins.className} space-x-8 text-[18px] tracking-wide uppercase flex items-center`}>
            <Link href="/" className="text-[#000] hover:text-[#036424]">Home</Link>
            <Link href="/aboutus" className="text-[#000] hover:text-[#036424]">About US</Link>
            <Link href="/quality" className="text-[#000] hover:text-[#036424]">Upload</Link>
            <Link href="/FAQ" className="text-[#000] hover:text-[#036424]">FAQ</Link>
            <Link href="/reports" className="text-[#000] hover:text-[#036424]">News</Link>
            <Link href="/contactus" className="text-[#000] hover:text-[#036424]">Contact us</Link>
          </div>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-1" />
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-t from-red-500 to-red-700 text-white px-6 py-3 rounded-full text-sm hover:opacity-90 transition duration-200 tracking-wide uppercase flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </button>
            </div>
          ) : (
            <Link href="/signin">
              <button className="bg-gradient-to-t from-[#a3d920] to-[#036424] text-white px-10 py-3 rounded-full text-sm hover:opacity-90 transition duration-200 tracking-wide uppercase">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-green-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className={`md:hidden px-6 pb-4 ${poppins.className}`}>
          <nav className="flex flex-col space-y-4 text-sm uppercase font-semibold">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-[#000] hover:text-[#036424]">Home</Link>
            <Link href="/upload" onClick={() => setMenuOpen(false)} className="text-[#000] hover:text-green-600">Upload</Link>
            <Link href="/reports" onClick={() => setMenuOpen(false)} className="text-[#000] hover:text-green-600">Reports</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-[#000] hover:text-green-600">About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-[#000] hover:text-[#036424]">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <div className="flex items-center text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  {user?.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-t from-red-500 to-red-700 text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition duration-200 tracking-wide uppercase flex items-center justify-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/signin" onClick={() => setMenuOpen(false)}>
                <button className="bg-gradient-to-t from-[#a3d920] to-[#036424] text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition duration-200 tracking-wide uppercase mt-2">
                  Sign In
                </button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}