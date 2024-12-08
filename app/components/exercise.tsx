import Image from "next/image";
import { dataProps } from "../page";
import Link from "next/link";
import { useState } from "react";

const spanStyles =
  "bg-white text-black px-2 box-border rounded-md mr-1 inline-block text-sm";

export default function Excercise(data: dataProps) {
  return (
    <Link
      href={`/detail/${data.id}`}
      className="bg-black h-[350px] rounded-md overflow-hidden min-w-[300px]"
    >
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          className="object-cover"
          fill
          src={data.thumbnail_urls[2]}
          alt={data.id}
          sizes="100%"
          priority
        />
      </div>

      <div className="text-white px-5 py-2  box-border">
        <div className="text-lg font-bold h-16 flex items-center mb-2">
          {data.video_title}
        </div>
        <div>
          {data.age_group && (
            <span className={spanStyles}># {data.age_group}</span>
          )}
          {data.support_tool && (
            <span className={spanStyles}># {data.support_tool}</span>
          )}
          {data.training_part && (
            <span className={spanStyles}># {data.training_part}</span>
          )}
          {data.training_purpose && (
            <span className={spanStyles}># {data.training_purpose}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
