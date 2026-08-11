import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Slogan from "@/components/Slogan";
import Menu from "@/components/Menu";
import Mood from "@/components/Mood";
import Gallery from "@/components/Gallery";
import Address from "@/components/Address";
import Finale from "@/components/Finale";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Slogan />
        <Menu />
        <Mood />
        <Gallery />
        <Address />
      </main>
      <Finale />
    </>
  );
}
