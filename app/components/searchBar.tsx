export default function SearchBar() {
  return (
    <div className="relative">
      <input className=" focus:outline-none focus:border-neutral-500 p-3  w-[600px] h-11 rounded-full border-2" />
      <button
        type="submit"
        className="absolute top-1/2 -translate-y-1/2  right-3 bg-neutral-200 size-9 rounded-full flex items-center justify-center"
      >
        <svg className="size-5" viewBox="0 0 512 512">
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </div>
  );
}
