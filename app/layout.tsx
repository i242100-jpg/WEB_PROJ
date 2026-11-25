import type { Metadata } from "next";
import type { ReactNode } from "react";
import AtlasLayout from "@/components/AtlasLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "The Passage | Quiz Atlas", template: "%s | Quiz Atlas" },
  description: "Explore a torchlit world of quizzes and wisdom badges.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AtlasLayout>{children}</AtlasLayout>
      </body>
    </html>
  );
}
