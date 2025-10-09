"use client";

import { useEffect, useState } from "react";
import { getOccasionById } from "@lib/apis/most-popular.api";
import HighlightedHeading from "@components/shared/highlighted-heading";

const occasionsList = [
  { id: "673b34c21159920171827ae0", name: "Wedding" },
  { id: "673b354b1159920171827ae8", name: "Birthday" },
  { id: "673b35c01159920171827aed", name: "Anniversary" },
  { id: "673b351e1159920171827ae5", name: "Graduation" },
];

export default function MostPopularSection() {
  const [activeTab, setActiveTab] = useState("Wedding");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const occasion = occasionsList.find((o) => o.name === activeTab);
    if (occasion) {
      getOccasionById(occasion.id).then((res) => {
        setData(res?.occasion);
      });
    }
  }, [activeTab]);

  return (
    <div className="p-6">
      <HighlightedHeading text="Most Popular" highlightWidth="150px" borderWidth="60px" />

      {/* Tabs buttons */}
      <div className="flex gap-3 mb-6 mt-5">
        {occasionsList.map((o) => (
          <button
            key={o.id}
            onClick={() => setActiveTab(o.name)}
            className={`px-4 py-2 rounded-md ${
              activeTab === o.name
                ? "bg-maroon-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {o.name}
          </button>
        ))}
      </div>

      {/* Content */}
      {data ? (
        <div className="border rounded-lg p-4 bg-white shadow">
          <h2 className="text-lg font-semibold">{data.name}</h2>
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-48 object-cover rounded-md mt-3"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
