"use client";

export default function LoadingDots() {
    return (
        <div className="flex items-center justify-center gap-2 py-8">
            <div className="flex gap-1.5">
                <div
                    className="w-2.5 h-2.5 bg-primary rounded-full animate-[bounce_1.4s_ease-in-out_infinite]"
                    style={{ animationDelay: "0s" }}
                />
                <div
                    className="w-2.5 h-2.5 bg-primary rounded-full animate-[bounce_1.4s_ease-in-out_infinite]"
                    style={{ animationDelay: "0.2s" }}
                />
                <div
                    className="w-2.5 h-2.5 bg-primary rounded-full animate-[bounce_1.4s_ease-in-out_infinite]"
                    style={{ animationDelay: "0.4s" }}
                />
            </div>
            <p className="ml-3 text-sm text-muted-foreground animate-pulse">
                Analyzing your resume...
            </p>
        </div>
    );
}
