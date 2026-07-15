import Navbar from "@/components/Navbar";
import DarkModeBanner from "@/components/DarkModeBanner";
import CartDrawer from "@/components/CartDrawer";
import Hero from "@/components/Hero";
import BrandStrip from "@/components/BrandStrip";
import Products from "@/components/Products";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <DarkModeBanner />
      <CartDrawer />
      <main>
        <Hero />
        <BrandStrip />
        <Products />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
