"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Brain } from "lucide-react";
import { useUploadResume } from "../../features/resume/api/useUploadResume";
import { useSaveJD } from "../../features/jd/useSaveJD";
import { useAnalyzeResume } from "@/features/analysis/useAnalyzeResume";

export default function DashboardPage() {
  const {
    mutate: uploadResume,
    isSuccess: resumeUploaded,
    isLoading: resumeUploading,
    data: resumeData,
  } = useUploadResume();

  const {
    mutate: saveJD,
    isSuccess: jdSaved,
    isLoading: jdSaving,
    data: jdData,
  } = useSaveJD();

  const {
    mutate: analyzeResume,
    isSuccess: analysisDone,
    isLoading: analyzing,
    data: analysisData,
  } = useAnalyzeResume();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [jdText, setJdText] = useState("");

  const canAnalyze = resumeUploaded && jdSaved;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadResume(selectedFile);
      setIsDisabled(true);
    }
  };

  const resumeId = resumeData?.id;
  

  
  const handleChangeJD = (e) => {
    setJdText(e.target.value);
  };
  

  const handleSaveJD = () => {
    const jobTitle = "Sample Job Title";
    saveJD({ resumeId, jobTitle, jdText });
    setJdText("");
  };

  const handleAnalyze = () => {
    analyzeResume({ jdId: jdData?.jdId });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold">HireSense AI Dashboard</h1>

        {/* Resume Upload */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Upload />
              <h2 className="text-xl text-zinc-100 font-medium">
                Upload Resume
              </h2>
            </div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              disabled={isDisabled}
              className={`block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:file:bg-gray-700"}`}
            />
            <Button
              onClick={handleUpload}
              disabled={isDisabled || !selectedFile || resumeUploading}
            >
              {resumeUploading ? "Uploading..." : "Upload PDF"}
            </Button>
            {resumeUploaded && (
              <p className="text-green-400 text-sm">
                Resume uploaded successfully
              </p>
            )}
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <FileText />
              <h2 className="text-xl text-zinc-100 font-medium">
                Job Description
              </h2>
            </div>
            <Textarea
              value={jdText}
              onChange={handleChangeJD}
              placeholder="Paste job description here..."
            />
            <Button
              disabled={!resumeUploaded || jdSaving || jdText.trim() === ""}
              onClick={handleSaveJD}
            >
              Save JD
            </Button>
            {jdSaved && (
              <p className="text-green-400 text-sm">Job description saved</p>
            )}
          </CardContent>
        </Card>

        {/* Analyze */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Brain />
              <h2 className="text-xl text-zinc-100 font-medium">
                Analyze Resume
              </h2>
            </div>
            <Button
              disabled={!canAnalyze || analyzing || analysisDone}
              onClick={handleAnalyze}
              className="w-full"
            >
              {analyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>
            {analysisDone && (
              <p className="text-green-400 text-sm">Analysis complete</p>
            )}
            {!canAnalyze && (
              <p className="text-gray-400 text-sm">
                Upload resume and save job description to enable analysis
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
