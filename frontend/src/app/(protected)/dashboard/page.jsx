"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Brain, Clock, TrendingUp } from "lucide-react";
import { useUploadResume } from "../../../features/resume/api/useUploadResume";
import { useSaveJD } from "../../../features/jd/useSaveJD";
import { useAnalyzeResume } from "@/features/analysis/useAnalyzeResume";
import { useGetAnalysisHistory } from "@/features/analysis/useGetAnalysisHistory";
import FileUploadZone from "@/components/ui/FileUploadZone";
import LoadingDots from "@/components/ui/LoadingDots";
import MetricsDisplay from "@/components/ui/MetricsDisplay";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useAnalysisUsage } from "../../../features/analysis/useAnalysisUsage";

export default function DashboardPage() {
  const router = useRouter();

  const {
    mutate: uploadResume,
    isSuccess: resumeUploaded,
    isPending: resumeUploading,
    data: resumeData,
  } = useUploadResume();

  const {
    mutate: saveJD,
    isSuccess: jdSaved,
    isPending: jdSaving,
    data: jdData,
  } = useSaveJD();

  const [limitInfo, setLimitInfo] = useState(null);

  const {
    mutate: analyzeResume,
    isPending: analyzing,
    data: analysisData,
  } = useAnalyzeResume({
    onLimit: (data) => setLimitInfo(data),
    onSuccess: (data) => setLimitInfo(data.usage),
  });

  const { data: usage, isLoading } = useAnalysisUsage();

  const { data: analysisHistory, isLoading: historyLoading } =
    useGetAnalysisHistory();

  const [selectedFile, setSelectedFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const jdSectionRef = useRef(null);
  const analyzeSectionRef = useRef(null);
  const resultsRef = useRef(null);

  const resumeId = resumeData?.id;
  const canAnalyze = resumeUploaded && jdSaved;

  // Animate job description section when resume is uploaded
  useEffect(() => {
    if (resumeUploaded && jdSectionRef.current) {
      gsap.fromTo(
        jdSectionRef.current,
        { opacity: 0, y: 30, height: 0 },
        { opacity: 1, y: 0, height: "auto", duration: 0.6, ease: "power3.out" },
      );
    }
  }, [resumeUploaded]);

  // Animate analyze section when JD is saved
  useEffect(() => {
    if (jdSaved && analyzeSectionRef.current) {
      gsap.fromTo(
        analyzeSectionRef.current,
        { opacity: 0, y: 30, height: 0 },
        { opacity: 1, y: 0, height: "auto", duration: 0.6, ease: "power3.out" },
      );
    }
  }, [jdSaved]);

  // Animate results section when analysis is complete and scroll to it
  useEffect(() => {
    if (analysisData && resultsRef.current) {
      gsap.fromTo(
        resultsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            // Smooth scroll to results after animation
            resultsRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          },
        },
      );
    }
  }, [analysisData]);

  const handleFileSelect = (file) => {
    if (!resumeUploaded) {
      setSelectedFile(file);
      handleUpload(file);
    }
  };

  const handleUpload = (file) => {
    uploadResume(file, {
      onSuccess: () => {
        toast.success("Resume uploaded successfully");
      },
      onError: (error) => {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Upload failed. Try again.";
        toast.error(message);
      },
    });
  };

  const handleRemoveFile = () => {
    if (!resumeUploaded) {
      setSelectedFile(null);
    }
  };

  const handleSaveJD = () => {
    saveJD({
      resumeId,
      jobTitle,
      jdText,
    });
  };

  const handleAnalyze = () => {
    analyzeResume({ jdId: jdData?.jdId });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 px-4 sm:px-6 py-10 relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto space-y-8 mt-20">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Resume <span className="text-primary">Analysis</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your resume, add a job description, and get instant ATS
            insights powered by AI.
          </p>
        </div>

        {/* Recent Analyses Section */}
        {analysisHistory && analysisHistory.length > 0 && (
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  Recent Analyses
                </h2>
              </div>

              <div className="space-y-3">
                {analysisHistory.slice(0, 5).map((analysis) => (
                  <div
                    key={analysis._id}
                    className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all group cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/analysis/${analysis._id}`)
                    }
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <TrendingUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {analysis.jobTitle}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(analysis.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-2xl font-bold ${getScoreColor(analysis.matchScore)}`}
                      >
                        {analysis.matchScore}%
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 1: Resume Upload */}
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardContent className="p-8 space-y-6">
            {usage?.remaining === 0 && (
              <div className="mt-3 ml-4 text-sm text-red-500">
                Daily analysis limit reached. Uploads will unlock tomorrow.
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Step 1: Upload Resume
                </h2>
                <p className="text-sm text-muted-foreground">
                  Upload your resume in PDF format
                </p>
              </div>
            </div>

            <FileUploadZone
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onRemove={handleRemoveFile}
              disabled={
                resumeUploading || resumeUploaded || usage?.remaining === 0
              }
            />

            {resumeUploading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Uploading resume...
              </div>
            )}

            {resumeUploaded && (
              <div className="flex items-center gap-2 text-sm text-green-500 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Resume uploaded successfully
              </div>
            )}
          </CardContent>
        </Card>

        {/* STEP 2: Job Description (Only shows after resume upload) */}
        {resumeUploaded && (
          <div ref={jdSectionRef} style={{ opacity: 0 }}>
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Step 2: Job Description
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Paste the job description you're applying for
                    </p>
                  </div>
                </div>

                <Textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  disabled={jdSaved || usage?.remaining === 0}
                  placeholder="Paste the complete job description here... Example: We are looking for a Senior Software Engineer with 5+ years of experience in React, Node.js, and cloud technologies..."
                  className="min-h-50 resize-none bg-background/50 border-border focus:border-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />

                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={jdSaved}
                  placeholder="Enter Job Title"
                  className="min-h-50 resize-none bg-background/50 border-border focus:border-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />

                <Button
                  disabled={jdText.trim() === "" || jdSaving || jdSaved}
                  onClick={handleSaveJD}
                  className="w-full sm:w-auto px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105"
                >
                  {jdSaving
                    ? "Saving..."
                    : jdSaved
                      ? "✓ Saved"
                      : "Continue to Analysis"}
                </Button>

                {jdSaved && (
                  <div className="flex items-center gap-2 text-sm text-green-500 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Job description saved
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* STEP 3: Analyze (Only shows after JD is saved) */}
        {canAnalyze && (
          <div ref={analyzeSectionRef} style={{ opacity: 0 }}>
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Step 3: AI Analysis
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Get instant ATS compatibility insights
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing || analysisData}
                  className="w-full py-6 text-lg font-semibold bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-50"
                >
                  {analyzing
                    ? "Analyzing..."
                    : analysisData
                      ? "✓ Analysis Complete"
                      : "🚀 Analyze Resume"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading Animation */}
        {analyzing && (
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-xl">
            <CardContent className="p-8">
              <LoadingDots />
            </CardContent>
          </Card>
        )}

        {/* ANALYSIS RESULTS */}
        {analysisData && !analyzing && (
          <div ref={resultsRef} style={{ opacity: 0 }}>
            <MetricsDisplay
              analysisData={analysisData}
              analysisId={analysisData.analysisId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
