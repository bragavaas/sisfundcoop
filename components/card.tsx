import React from "react";
import { Card as CardUI, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { BsFillPeopleFill } from "react-icons/bs";
import { IconType } from "react-icons"; // Import IconType for icon prop type


interface CardProps {
  icon: IconType;
  iconColor: string;
  backgroundColor: string;
  title: string;
  info: string;
}
const Card: React.FC<CardProps> = ({ icon: Icon, iconColor, backgroundColor, title, info }) => {
  return (
    <CardUI className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div style={{ backgroundColor }} className="w-16 h-16 flex items-center justify-center rounded-full">
            <Icon className="w-10 h-10" color={iconColor} />
          </div>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-large font-semibold leading-none text-default-600">{title}</h4>
            <h5 className="text-large tracking-tight text-default-400">{info}</h5>
          </div>
        </div>
      </CardHeader>
    </CardUI>
  );
};

export default Card;
