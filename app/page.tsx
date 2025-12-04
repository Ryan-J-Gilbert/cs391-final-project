// Component: Home page (except carousel) 
// Author: Ryan Gilbert
// Email: ryanjg@bu.edu

"use client";

import Image from "next/image";
import BigNumber from "@/components/BigNumber";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GraphCarousel from "@/components/GraphCarousel";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-evenly pt-10 dark">
        <BigNumber title="Wants" value={100} change={10} />
        <BigNumber title="Needs" value={200} change={5} />
        <BigNumber title="Savings" value={50} change={-5} />
      </div>

      <GraphCarousel />

      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex justify-evenly pb-4">
          <Link href="/report"><Button variant="outline" className="m-4">New Report</Button></Link>
          <Link href="/history"><Button variant="outline" className="m-4">History</Button></Link>
        </div>
      </div>
    </div>
  );

}
