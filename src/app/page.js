import HeroSlider from "@/components/home/HeroSlider";
import CategoryNav from "@/components/home/CategoryNav";
import CategorySection from "@/components/home/CategorySection";
import CustomOrders from "@/components/home/CustomOrders";
import Reviews from "@/components/home/Reviews";
import { HOME_SECTIONS } from "@/lib/homeSections";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryNav />
      {HOME_SECTIONS.map((section, i) => (
        <CategorySection key={section.id} section={section} index={i} />
      ))}
      <CustomOrders />
      <Reviews />
    </>
  );
}
