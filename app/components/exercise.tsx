import Image from "next/image";
import { dataProps } from "../page";
import Link from "next/link";

export default function Excercise(data: dataProps) {
  return (
    <Link
      href={`/detail/${data.id}`}
      className="bg-black h-80 rounded-md overflow-hidden"
    >
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          className="object-cover"
          fill
          src={data.thumbnail_url}
          alt={data.id}
          sizes="100%"
          priority
        />
      </div>

      <div className="text-white px-5 py-2">
        <div className="text-lg font-bold">{data.video_title}</div>
        <div>
          <span>{data.age_group}</span>
          <span>{data.support_tool}</span>
          <span>{data.training_part}</span>
          <span>{data.training_purpose}</span>
          <span>{data.training_type}</span>
        </div>
      </div>
    </Link>
  );
}
