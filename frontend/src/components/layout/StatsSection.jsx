"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function StatsSection() {
    const statsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-item", {
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
            });
        }, statsRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        {
            platform: "Trustpilot",
            rating: 4.4,
            reviews: "3,475 reviews",
            stars: 5,
            color: "text-green-600",
        },
        {
            platform: "Google",
            rating: 4.7,
            reviews: "",
            stars: 5,
            color: "text-yellow-500",
        },
        {
            platform: "App Store",
            rating: 4.6,
            reviews: "",
            stars: 5,
            color: "text-yellow-500",
        },
    ];

    const renderStars = (rating, color) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(rating) ? color : "text-muted"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <section
            ref={statsRef}
            className="py-12 lg:py-16 bg-muted/30 border-y border-border"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-item flex flex-col items-center text-center space-y-3"
                        >
                            <h3 className="text-lg font-semibold text-foreground">
                                {stat.platform}
                            </h3>
                            {renderStars(stat.rating, stat.color)}
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-foreground">
                                    {stat.rating} / 5
                                </p>
                                {stat.reviews && (
                                    <p className="text-sm text-muted-foreground">{stat.reviews}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
