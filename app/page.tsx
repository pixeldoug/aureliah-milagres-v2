import { MenuProvider } from "@/components/menu-context";
import { Nav } from "@/components/Nav";
import { Intro } from "@/components/Intro";

export default function Home() {
  return (
    <MenuProvider>
      <Nav />
      <main>
        <Intro />
      </main>
    </MenuProvider>
  );
}
