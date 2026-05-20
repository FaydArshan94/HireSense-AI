"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

export default function LayoutProvider({ children }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background overflow-hidden">
                {children}
            </main>
            <Toaster />
            {/* <Footer /> */}
        </>
    );
}
