"use client";

import { TypeDataListWhole } from "@/types/types";
import { newParam } from "@/helper/newParam";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const Paggination = (data: { data: TypeDataListWhole }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const choosePage = async (pageNumber: number) => {
    await router.push("/" + newParam(String(pageNumber), q));
  };

  type TypePaginationProps = {
    currentPage: number;

    allPages: number;
  };

  const pagination: TypePaginationProps = {
    currentPage: data.data.page!,

    allPages: data.data.total_pages!,
  };

  const { currentPage, allPages } = pagination;

  return (
    <div className="flex flex-wrap max-w-[60vw] gap-2 text-white">
      <button
        className="flex justify-center items-center cursor-pointer"
        disabled={currentPage == 1}
        onClick={() => choosePage(currentPage - 1)}
      >
        {`<=`}
      </button>
      {/*first*/}
      {currentPage > 1 && (
        <span
          className={`p-4 rounded-xl bg-teal-500 cursor-pointer`}
          onClick={() => choosePage(1)}
        >
          {allPages ? 1 : "unknown"}
        </span>
      )}
      {/*current*/}

      <span
        className={`p-4 rounded-xl bg-teal-800 text-white cursor-pointer`}
        onClick={() => choosePage(currentPage)}
      >
        {currentPage ? currentPage : "unknown"}
      </span>

      {/*last*/}
      {currentPage !== allPages && (
        <span
          className={`p-4 rounded-xl bg-teal-500 text-white cursor-pointer`}
          onClick={() => choosePage(allPages)}
        >
          {allPages ? allPages : "unknown"}
        </span>
      )}
      <button
        className="flex justify-center items-center "
        disabled={currentPage === allPages}
        onClick={() => choosePage(currentPage + 1)}
      >{`=>`}</button>
    </div>
  );
};

export default Paggination;
