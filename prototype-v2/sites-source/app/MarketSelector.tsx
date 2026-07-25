"use client";

import { useEffect, useRef } from "react";

const markets = [
  { value: "in", label: "India", path: "/" },
  { value: "ae", label: "United Arab Emirates", path: "/gcc?market=ae" },
  { value: "sa", label: "Saudi Arabia", path: "/gcc?market=sa" },
  { value: "qa", label: "Qatar", path: "/gcc?market=qa" },
  { value: "bh", label: "Bahrain", path: "/gcc?market=bh" },
  { value: "eu", label: "Europe", path: "/international?market=eu" },
  { value: "us", label: "United States", path: "/international?market=us" },
] as const;

type MarketCode = (typeof markets)[number]["value"];

const supportedMarkets = new Set<MarketCode>(
  markets.map((market) => market.value),
);

function inferMarket(): MarketCode {
  return "in";
}

export default function MarketSelector() {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const urlMarket = new URLSearchParams(window.location.search).get("market");
    const storedMarket = window.localStorage.getItem("fernesta-market");
    const initialMarket =
      (urlMarket && supportedMarkets.has(urlMarket as MarketCode)
        ? (urlMarket as MarketCode)
        : null) ??
      (storedMarket && supportedMarkets.has(storedMarket as MarketCode)
        ? (storedMarket as MarketCode)
        : null) ??
      inferMarket();

    if (selectRef.current) selectRef.current.value = initialMarket;
    document.documentElement.dataset.fernestaMarket = initialMarket;
  }, []);

  const chooseMarket = (nextMarket: MarketCode) => {
    window.localStorage.setItem("fernesta-market", nextMarket);
    document.documentElement.dataset.fernestaMarket = nextMarket;

    const destination = markets.find(
      (marketOption) => marketOption.value === nextMarket,
    )?.path;
    if (destination) window.location.assign(destination);
  };

  return (
    <label className="market-selector">
      <span>Market</span>
      <select
        ref={selectRef}
        aria-label="Choose your country or market"
        defaultValue="in"
        onChange={(event) => chooseMarket(event.target.value as MarketCode)}
      >
        {markets.map((marketOption) => (
          <option key={marketOption.value} value={marketOption.value}>
            {marketOption.label}
          </option>
        ))}
      </select>
    </label>
  );
}
