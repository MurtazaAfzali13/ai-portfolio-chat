import ChatModal from "@/components/ChatModal";
import "./globals.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata = {
  title: "My Portfolio",
  description: "Personal portfolio built with Next.js and Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Header />
        <ChatModal />
        <Footer />
      </body>
    </html>
  );
}