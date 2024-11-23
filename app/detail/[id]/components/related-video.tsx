import { dataProps } from "@/app/page";
import Image from "next/image";

export default function RelatedVideo(data: dataProps) {
  return (
    <div className="border-2 w-96 h-60">
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
    </div>
  );
}
