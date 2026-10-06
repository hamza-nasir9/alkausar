import HeroSlider from "@/components/home/HeroSlider";
import CategoryNav from "@/components/home/CategoryNav";
import HomeIntro from "@/components/home/HomeIntro";
import CategorySection from "@/components/home/CategorySection";
import CustomOrders from "@/components/home/CustomOrders";
import Reviews from "@/components/home/Reviews";
import { HOME_SECTIONS } from "@/lib/homeSections";
import { SITE, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: SITE.title, description: SITE.description, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryNav />
      <HomeIntro />
      {HOME_SECTIONS.map((section, i) => (
        <CategorySection key={section.id} section={section} index={i} />
      ))}
      <CustomOrders />
      <Reviews />
    </>
  );
}
