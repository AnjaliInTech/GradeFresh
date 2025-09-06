// // import type { Metadata } from "next";
// import { AuthProvider } from './contexts/AuthContext'
// import { Geist, Geist_Mono } from "next/font/google";
// import { Cinzel, Poppins } from "next/font/google";

// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const cinzel = Cinzel({
//   subsets: ['latin'],
//   variable: '--font-cinzel',
// });

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600'],
//   variable: '--font-poppins',
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={poppins.className}>
//         <AuthProvider>
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }
// app/layout.tsx

// app/layout.tsx
import type { Metadata } from "next";
import { AuthProvider } from './contexts/AuthContext'
import { Poppins } from "next/font/google";
import ChatWidgetSimple from './components/ChatWidgetSimple';
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Your Website",
  description: "Your website description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          {children}
          <ChatWidgetSimple />
        </AuthProvider>
      </body>
    </html>
  )
}
