/*
 * History Page
 * Author: Seth Culberson
 * Email: sethculb@bu.edu
 * 
 * Page to display user's budgeting history.
 */

"use client";
import { useState, useEffect } from "react";
import { MonthEntry } from "@/types/MonthEntry";
import { getDatabase } from "../db";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function History() {
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

    return (
        <div className="bg-white min-h-screen p-4">
            <h2 className="">History | <Link href="/dashboard" className="hover:border-b border-black">Back</Link></h2>
            {/* Mapping for each month entry to a display card. */}
            <ul>
            {entries.map((m : MonthEntry) => (
                <li key={m.id} className="flex flex-col border border-white rounded-md p-2 m-4">
                    <Card className="pl-[10%] pr-[10%] bg-gray-50 text-center">
                        <p className="text-2xl">Date: {m.month+"/"+m.year}</p>
                        <div className="flex gap-4 justify-between">
                            <p className="inline text-blue-600 text-xl">Wants: ${m.wants}</p>
                            <p className="inline text-green-500 text-xl">Needs: ${m.needs}</p>
                            <p className="inline text-orange-500 text-xl">Savings: ${m.savings}</p>
                        </div>
                        <p className="text-2xl">Total Budget: ${m.total}</p>
                    </Card>
                </li>
            ))}
            </ul>
        </div>
    );
}