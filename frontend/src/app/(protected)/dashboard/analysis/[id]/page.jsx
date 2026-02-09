"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Calendar, Briefcase } from "lucide-react";
import { useGetAnalysisById } from "@/features/analysis/useGetAnalysisById";
import LoadingDots from "@/components/ui/LoadingDots";

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params.id;

  const { data: analysis, isLoading, error } = useGetAnalysisById(analysisId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-background to-muted/20 px-4 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto mt-20">
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
            <CardContent className="p-8">
              <LoadingDots />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-linear-to-b from-background to-muted/20 px-4 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto mt-20 text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Analysis Not Found
          </h1>
          <p className="text-muted-foreground">
            The analysis you're looking for doesn't exist or you don't have
            access to it.
          </p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const { analysisResult, jdId, createdAt } = analysis;
  const { matchScore, matchedSkills, missingSkills, suggestions } =
    analysisResult;

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
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 px-4 sm:px-6 py-10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto space-y-8 mt-20">
        {/* Header with Back Button */}
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>

          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl overflow-clip">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>Position</span>
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {jdId?.jobTitle || "Analysis Details"}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Analyzed on{" "}
                      {new Date(createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/dashboard")}
                  className="px-2 py-2  md:px-8 md:py-6 text-sm sm:text-base md:text-lg font-medium bg-primary hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105 group  sm:w-auto"
                >
                  <RefreshCw className="mr-2 w-4 hidden sm:block h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="">Re-analyze</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        <div className="space-y-8">
          {/* Score Display */}
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-8 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  ATS Match Score
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Analysis Complete
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className={`text-7xl font-bold ${getScoreColor(matchScore)}`}
                >
                  {matchScore}%
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-linear-to-r ${getProgressGradient(matchScore)} rounded-full transition-all duration-1000`}
                    style={{ width: `${matchScore}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {matchScore >= 80 &&
                    "Excellent match! Your resume is well-optimized for this position."}
                  {matchScore >= 60 &&
                    matchScore < 80 &&
                    "Good match! Consider adding missing skills to improve your score."}
                  {matchScore < 60 &&
                    "Your resume needs improvement. Focus on the suggestions below."}
                </p>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Matched Skills */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <h3 className="text-lg font-semibold text-foreground">
                  Matched Skills
                </h3>
                <span className="ml-auto text-sm text-muted-foreground">
                  {matchedSkills.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm font-medium rounded-full bg-green-500/10 text-green-500 border border-green-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <h3 className="text-lg font-semibold text-foreground">
                  Missing Skills
                </h3>
                <span className="ml-auto text-sm text-muted-foreground">
                  {missingSkills.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm font-medium rounded-full bg-red-500/10 text-red-500 border border-red-500/20"
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
              <div className="w-2 h-2 bg-primary rounded-full" />
              <h3 className="text-lg font-semibold text-foreground">
                Recommendations
              </h3>
            </div>
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
