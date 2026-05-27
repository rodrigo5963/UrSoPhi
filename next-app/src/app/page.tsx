// src/app/page.tsx
"use client";

import Header from "../components/Header";
import TabSwitcher from "../components/TabSwitcher";
import TextGenerator from "../components/TextGenerator";
import ImageGenerator from "../components/ImageGenerator";
import Protected from "../components/Protected";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("text");
  return (
    <Protected>
      <main className="container">
        <Header />
        <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        <TextGenerator />
        <ImageGenerator />
      </main>
    </Protected>
  );
}
