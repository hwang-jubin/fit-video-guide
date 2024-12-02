// page.tsx (또는 상위 레벨 컴포넌트)
"use client";

import { Suspense } from "react";
import SearchResult from "./components/search-result";

export default function Page() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <SearchResult />
    </Suspense>
  );
}
