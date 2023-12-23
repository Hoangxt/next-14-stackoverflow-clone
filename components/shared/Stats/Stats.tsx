import React from "react";
import Image from "next/image";
import { formatAndDivideNumber } from "@/lib/utils";
import { BadgeCounts } from "@/types";
interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-center gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="paragraph-semibold text-dark200_light900 ">
          {formatAndDivideNumber(value)}
        </p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

interface StatsProps {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputation: number;
}

const Stats = ({
  totalQuestions,
  totalAnswers,
  badges,
  reputation,
}: StatsProps) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">
        Stats: {reputation} Reputation
      </h4>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="paragraph-semibold text-dark200_light900 ">
              {totalQuestions ? formatAndDivideNumber(totalQuestions) : "0"}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="paragraph-semibold text-dark200_light900 ">
              {totalAnswers ? formatAndDivideNumber(totalAnswers) : "0"}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>

        {/* show badges */}
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          // value={badges.GOLD}
          value={0}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          // value={badges.SILVER}
          value={0}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          // value={badges.BRONZE}
          value={0}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
