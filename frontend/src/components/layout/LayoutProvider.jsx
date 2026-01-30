"use client";

import Navbar from "./Navbar";

export default function LayoutProvider({ children }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background overflow-hidden">
                {children}
            </main>
        </>
    );
}
