import { dataProps } from "../page";
import Excercise from "./exercise";

export default function ExcerciseList({ data }: { data: dataProps[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-7">
      {data.map((data) => (
        <Excercise key={data.id} {...data} />
      ))}
    </div>
  );
}
