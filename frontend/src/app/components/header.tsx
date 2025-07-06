import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

// Setup the Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})


export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-3">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="FruitLens Logo"
            width={130}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Navigation Menu */}
        <nav className="flex-1 flex justify-center">
             <div className={`${poppins.className} space-x-8 text-[18px]  tracking-wide uppercase flex items-center`}>
               <Link href="/" className="text-[#000] hover:text-[#036424] active:text-[#036424]">Home</Link>
               <Link href="/upload" className="text-[#000] hover:text-green-600">Upload</Link>
               <Link href="/reports" className="text-[#000] hover:text-green-600">Reports</Link>
               <Link href="/about" className="text-[#000] hover:text-green-600">About</Link>
               <Link href="/contact" className="text-[#000] hover:text-[#036424]">Contact</Link>
            </div>
        </nav>


        {/* Sign In Button */}
        <div>
          <Link href="/login">
            <button className="bg-gradient-to-t from-[#a3d920] to-[#036424] text-[16px]  tracking-wide uppercase flex items-center text-white px-10 py-3 rounded-full text-sm hover:opacity-90 transition duration-200">
              Sign In
           </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
