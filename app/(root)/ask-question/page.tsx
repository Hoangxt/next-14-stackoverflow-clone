import Question from "@/components/forms/Question";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask-question | Dev Overflow",
  description: "Ask question page of Dev Overflow",
};
const page = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};

export default page;
