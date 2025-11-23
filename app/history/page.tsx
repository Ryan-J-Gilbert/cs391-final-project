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
        <div className="">
            <h2 className="">History</h2>
            {entries.map((m : MonthEntry) => (
                <div key={m.id} className="">
                    <p className="">Date: {m.month+"/"+m.year}</p>
                    <p className="">Wants: ${m.wants}</p>
                    <p className="">Needs: ${m.needs}</p>
                    <p className="">Savings: ${m.savings}</p>
                    <p className="">Total Budget: ${m.total}</p>
                </div>
            ))}
        </div>
    );
}