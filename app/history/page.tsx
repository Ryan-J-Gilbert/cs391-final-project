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
import NavBar from "../components/NavBar";

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
        <div className="bg-slate-900 min-h-screen p-4">
            <NavBar />
            <h2 className="">History</h2>
            {/* Mapping for each month entry to a display card. I'm going to refactor this into its own component later.*/}
            {entries.map((m : MonthEntry) => (
                <div key={m.id} className="flex flex-col border-2 border-white rounded-md p-4 m-4">
                    <p className="">Date: {m.month+"/"+m.year}</p>
                    <div className="flex gap-4">
                        <p className="inline">Wants: ${m.wants}</p>
                        <p className="inline">Needs: ${m.needs}</p>
                        <p className="inline">Savings: ${m.savings}</p>
                    </div>
                    <p className="">Total Budget: ${m.total}</p>
                </div>
            ))}
        </div>
    );
}