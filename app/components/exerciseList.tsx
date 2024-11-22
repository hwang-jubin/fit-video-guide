import { dataProps } from "../page";
import Excercise from "./exercise";

export default function ExcerciseList({ data }: { data: dataProps[] }) {
  return (
    <div className="grid grid-cols-3 gap-x-16 gap-y-11 mt-6">
      {data.map((data) => (
        <Excercise key={data.id} {...data} />
      ))}
    </div>
  );
}
