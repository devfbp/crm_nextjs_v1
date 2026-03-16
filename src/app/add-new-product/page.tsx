import AddNewBreadcrumb from "@/component/breadcrumb/AddNewBreadcrumb";
import Footer from "@/component/footer/Footer";
import CategorySection from "@/component/product/CategorySection";
import NewProductTitle from "@/component/product/NewProductTitle";
import ProductData from "@/component/product/ProductData";
import ProductDescription from "@/component/product/ProductDescription";
import ProductTags from "@/component/product/ProductTags";
import PublishedProduct from "@/component/product/PublishedProduct";
import SeoData from "@/component/product/SeoData";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Add New Product",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <AddNewBreadcrumb link="/allProduct" title="Add New Product" />
      <div className="row g-4">
        <div className="col-xxl-9 col-lg-8">
          <NewProductTitle />
          <ProductDescription />
          <ProductData />
          <SeoData />
        </div>
        <div className="col-xxl-3 col-lg-4 add-product-sidebar">
          <div className="mb-30 w-100">
            <Link href="#" className="btn btn-primary d-block">
              Preview Changed
            </Link>
          </div>
          <PublishedProduct />
          <CategorySection />
          <ProductTags />
        </div>
      </div>

      <Footer />
    </main>
  );
}
