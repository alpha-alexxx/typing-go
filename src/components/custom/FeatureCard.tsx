import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const FeatureCard = ({
  name,
  description,
  icon,
}: {
  name: string;
  description: string;
  icon: string;
}) => {
  return (
    <Card className=" relative flex flex-col items-center justify-start shadow-md">
      <div className="item-center  absolute -top-5 flex h-12 w-12 select-none justify-center rounded-md border border-input bg-gradient-to-tr from-primary to-teal-500">
        <Image
          src={icon}
          alt={name}
          width={40}
          height={40}
          className="p-1 invert"
        />
      </div>
      <CardContent>
        <CardTitle className="mt-10 text-center text-xl">{name}</CardTitle>
        <CardDescription className="mt-4 text-center text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
