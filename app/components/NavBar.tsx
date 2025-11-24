/*
 * NavBar Component
 * Author: Seth Culberson
 * Email: sethculb@bu.edu
 * 
 * Navigation bar for the budgeting app.
 */

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="">
            <ul className="flex gap-4">
                <li className="inline"><Link href="/">Home</Link></li>
                <li className="inline"><Link href="/history">History</Link></li>
                <li className="inline">Insert Link Here</li>
            </ul>

        </nav>
    )
}