"use client";

import dynamic from "next/dynamic";

const ReviewsSection = dynamic(() => import("./ReviewsSection").then(m => ({ default: m.ReviewsSection })), { loading: () => null });
const FaqSection = dynamic(() => import("./FaqSection").then(m => ({ default: m.FaqSection })), { loading: () => null });

export function ReviewsSectionDynamic() {
  return <ReviewsSection />;
}

export function FaqSectionDynamic() {
  return <FaqSection />;
}
