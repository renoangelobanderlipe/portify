"use client";

import { useState } from "react";
import iconsMock from "@/_mock/iconsMock.json";
import { TechStackCardDisplay } from "./TechStackCardDisplay";
import { TechStackForm } from "./TechStackForm";

export default function TechStackCard() {
  // TODO: Remove this when integrating with backend
  const [icons, setIcons] = useState(iconsMock);

  // TODO: Remove this when integrating with backend
  const addIcon = (newIcon: (typeof iconsMock)[0]) => {
    setIcons((prev) => [...prev, newIcon]);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <TechStackForm onSubmitIcon={addIcon} />
      <TechStackCardDisplay icons={icons} />
    </div>
  );
}
