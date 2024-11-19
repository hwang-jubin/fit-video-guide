const category = ["맞춤동영상", "상체근력", "하체근력", "전신유산소"];

export default function Category() {
  return (
    <div className="flex gap-2">
      {category.map((category, index) => (
        <div className="p-2 bg-black text-white rounded-md" key={index}>
          {category}
        </div>
      ))}
    </div>
  );
}
