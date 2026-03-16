import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import Footer from "@/component/footer/Footer";
import CustomPaginationSlider from "@/component/slider/CustomPaginationSlider";
import DefaultSlider from "@/component/slider/DefaultSlider";
import EffectCoverflowSlider from "@/component/slider/EffectCoverflowSlider";
import EffectCreativeSlider from "@/component/slider/EffectCreativeSlider";
import EffectFadeSlider from "@/component/slider/EffectFadeSlider";
import EffectFlipSlider from "@/component/slider/EffectFlipSlider";
import MouseControlSlider from "@/component/slider/MouseControlSlider";
import NavigationSlider from "@/component/slider/NavigationSlider";
import PaginationFractionSlider from "@/component/slider/PaginationFractionSlider";
import PaginationProgress from "@/component/slider/PaginationProgress";
import PaginationSlider from "@/component/slider/PaginationSlider";
import ResponsiveSlider from "@/component/slider/ResponsiveSlider";
import ScrollbarSlider from "@/component/slider/ScrollbarSlider";
import VerticalSlider from "@/component/slider/VerticalSlider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Swiper Slider Page",
  description: "",
};
export default function Home() {
  return (
    <main className="main-coontent swiper-slider-main-section">
      <DashboardBreadcrumb2 title="Swiper Slider" />
      <div className="row swiper-slider-component g-4">
        <DefaultSlider />
        <NavigationSlider />
        <PaginationSlider />
        <PaginationFractionSlider />
        <CustomPaginationSlider />
        <PaginationProgress />
        <ScrollbarSlider />
        <VerticalSlider />
        <MouseControlSlider />
        <EffectFadeSlider />
        <EffectFlipSlider />
        <EffectCreativeSlider />
        <EffectCoverflowSlider />
        <ResponsiveSlider />
      </div>

      <Footer />
    </main>
  );
}
