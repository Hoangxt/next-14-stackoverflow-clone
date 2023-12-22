import Metric from "@/components/shared/Metric/Metric";
import ParseHTML from "@/components/shared/ParseHTML/ParseHTML";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Metadata } from "next";
import RenderTag from "@/components/shared/RightSidebar/RenderTag";

export const metadata: Metadata = {
  title: "Question details | Dev Overflow",
  description: "Question page of Dev Overflow",
};

interface QuestionDetailsProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
}

const QuestionDetails = async ({
  params,
  searchParams,
}: QuestionDetailsProps) => {
  const { question } = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex justify-center gap-1"
          >
            <Image
              src={question.author.picture}
              alt="Picture of the author"
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>

          <div className="flex justify-end">Voting</div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-4 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          // href={`/question/${_id}`}
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(question.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          // href={`/question/${_id}`}
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          // href={`/question/${_id}`}
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(question.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      {/* Parsing code to show in Ui */}
      <ParseHTML data={question.content} />

      {/* Rending Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      {/* All Answers */}
    </>
  );
};

export default QuestionDetails;
