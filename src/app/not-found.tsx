import Link from "next/link";
import { Metadata } from "next";
import CtaButton from "@/components/CtaButton";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist. Return to the Roth IRA Calculator.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-xl">
      <h1 className="text-4xl font-bold text-white mb-4">Page not found</h1>
      <p className="text-gray-300 mb-8">
        That URL is not available. Head back to the free Roth IRA calculator or browse our guides.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <CtaButton href="/">OPEN CALCULATOR</CtaButton>
        <Link href="/blog" className="text-accent hover:underline self-center">
          Visit the blog
        </Link>
      </div>
    </div>
  );
}
