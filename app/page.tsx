"use client";
// Component: Home page (except carousel) 
// Author: Ryan Gilbert
// Email: ryanjg@bu.edu

import Image from "next/image";
import BigNumber from "@/components/BigNumber";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDatabase } from "@/app/db";
import { useState, useEffect } from "react";
import { MonthEntry } from "@/types/MonthEntry";


export default function Home() {
  const [entries, setEntries] = useState([] as MonthEntry[]);

  useEffect(() => {
    getDatabase().then((collection) => {
      const query = collection.finances.find();
      const _ = query.$.subscribe((months: MonthEntry[]) => {
        setEntries(months);
      })
    })
      .catch((err) => {
        console.error("Failed to fetch month entries:", err);
      });
  }, []);

  console.log(entries);
  let wantsValue = 0;
  let needsValue = 0;
  let savingsValue = 0;
  let wantsChange = 0;
  let needsChange = 0;
  let savingsChange = 0;

  if (entries.length) {
    wantsValue = entries[entries.length - 1].wants;
    needsValue = entries[entries.length - 1].needs;
    savingsValue = entries[entries.length - 1].savings;
  }

  if (entries.length > 1) {
    wantsChange = wantsValue - entries[entries.length - 2].wants;
    needsChange = needsValue - entries[entries.length - 2].needs;
    savingsChange = savingsValue - entries[entries.length - 2].savings;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-evenly pt-10 dark">
        <BigNumber title="Wants" value={wantsValue} change={wantsChange} />
        <BigNumber title="Needs" value={needsValue} change={needsChange} />
        <BigNumber title="Savings" value={savingsValue} change={savingsChange} />
      </div>
      <div className="flex items-center justify-evenly pt-10">
        <h1 className="text-8xl pt-10">Carousel</h1>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex justify-evenly pb-4">
          <Link href="/report"><Button variant="outline" className="m-4">New Report</Button></Link>
          <Link href="/history"><Button variant="outline" className="m-4">History</Button></Link>
        </div>
      </div>
    </div>
  );
}
