import { dataProps } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

const spanStyles =
  "bg-white text-black px-2 box-border rounded-md mr-1 inline-block text-sm";

export default function RelatedVideo(data: dataProps) {
  return (
    <Link href={`/detail/${data.id}`} className="border-2 w-96 h-64 ">
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          className="object-cover"
          fill
          src={data.thumbnail_url}
          alt={data.id}
          sizes="100%"
          priority
        />
      </div>
      <div className="bg-black p-2 gap-2 flex flex-col">
        <div className="text-white">{data.video_title}</div>
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
