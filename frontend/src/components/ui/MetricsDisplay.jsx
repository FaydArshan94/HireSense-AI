"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { CheckCircle, XCircle, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "./button";

export default function MetricsDisplay({ analysisData, analysisId }) {
    const containerRef = useRef(null);
    const scoreRef = useRef(null);
    const [displayScore, setDisplayScore] = useState(0);
    const router = useRouter();

    const { matchScore, matchedSkills, missingSkills, suggestions } = analysisData.analysis;

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animate container entrance
            tl.from(containerRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.6,
            });

            // Animate score counter
            gsap.to({ val: 0 }, {
                val: matchScore,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: function () {
                    setDisplayScore(Math.round(this.targets()[0].val));
                },
                delay: 0.3,
            });

            // Animate skills
            tl.from(".skill-pill", {
                scale: 0.8,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
            }, "-=1");

            // Animate suggestions
            tl.from(".suggestion-item", {
                x: -20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
            }, "-=0.6");
        }, containerRef);

        return () => ctx.revert();
    }, [matchScore]);

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-500";
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    const getProgressGradient = (score) => {
        if (score >= 80) return "from-green-500 to-emerald-400";
        if (score >= 60) return "from-yellow-500 via-yellow-400 to-green-400";
        return "from-red-500 via-orange-400 to-yellow-400";
    };

    return (
        <div ref={containerRef} className="space-y-8">
            {/* Score Display */}
            <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-8 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

                <div className="relative space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-foreground">ATS Match Score</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Analysis Complete
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div ref={scoreRef} className={`text-7xl font-bold ${getScoreColor(displayScore)}`}>
                            {displayScore}%
                        </div>
                        <div className="h-4 bg-muted rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r ${getProgressGradient(matchScore)} rounded-full transition-all duration-1000`}
                                style={{ width: `${displayScore}%` }}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {matchScore >= 80 && "Excellent match! Your resume is well-optimized for this position."}
                            {matchScore >= 60 && matchScore < 80 && "Good match! Consider adding missing skills to improve your score."}
                            {matchScore < 60 && "Your resume needs improvement. Focus on the suggestions below."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Matched Skills */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <h3 className="text-lg font-semibold text-foreground">Matched Skills</h3>
                        <span className="ml-auto text-sm text-muted-foreground">
                            {matchedSkills.length}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {matchedSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="skill-pill px-3 py-1.5 text-sm font-medium rounded-full bg-green-500/10 text-green-500 border border-green-500/20"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Missing Skills */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <h3 className="text-lg font-semibold text-foreground">Missing Skills</h3>
                        <span className="ml-auto text-sm text-muted-foreground">
                            {missingSkills.length}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill, index) => (
                            <span
                                key={index}
                                className="skill-pill px-3 py-1.5 text-sm font-medium rounded-full bg-red-500/10 text-red-500 border border-red-500/20"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Recommendations</h3>
                </div>
                <ul className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="suggestion-item flex items-start gap-3 text-muted-foreground"
                        >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                                {index + 1}
                            </span>
                            <span className="text-sm leading-relaxed">{suggestion}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* View Full Analysis Button */}
            {analysisId && (
                <div className="flex justify-center pt-4">
                    <Button
                        onClick={() => router.push(`/dashboard/analysis/${analysisId}`)}
                        className="px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105 group"
                    >
                        View Full Analysis
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            )}
        </div>
    );
}
