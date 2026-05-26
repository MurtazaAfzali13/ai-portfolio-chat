import ChatModal from "@/components/ChatModal";
import MouseTrail from "@/components/MouseTrail";
import "./globals.css"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Murtaza Afzali | Autonomous AI Agents & Full-Stack",
  description:
    "Full-stack developer building autonomous AI agents, reflection workflows, and database-driven intelligent systems with LangChain, LangGraph, and FastAPI.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MouseTrail />
        {children}
        {modal}
        <Header />
        <ChatModal />
        <Footer />
      </body>
    </html>
  );
}