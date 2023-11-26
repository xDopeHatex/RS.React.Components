import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import SearchSection from "@/components/SearchSection";
import DataSection from "@/components/DataSection";
import Paggination from "@/components/Paggination";

import TestErrorBoundaryButton from "@/components/TestErrorBoundaryButton";
import { TypeDataList, TypeDataListWhole } from "@/types/types";
import { searchPageHandler } from "@/pages/api/fetch";
import Layout from "@/components/Layout";

import {  NextPageContext } from "next";

// Define a type for your context
type MyServerSidePropsContext = NextPageContext & {
  query: {
    q?: string;
    page?: string;

  };

};


export const getServerSideProps: (context: MyServerSidePropsContext) => Promise<{ props: { list: TypeDataListWhole; keyWord: string } }> = async (context: MyServerSidePropsContext) => {
  const q =
    context.query.q && typeof context.query.q === "string"
      ? context.query.q
      : "a";
  const page =
    context.query.page && Number(context.query.page) > 0
      ? Number(context.query.page)
      : 1;

  const responseData =
    q === null
      ? await searchPageHandler(1, "a")
      : await searchPageHandler(page, q);

  return {
    props: {
      list: responseData,
      keyWord: q,
    },
  };
};

export default function Home({
  list,
  keyWord,
}: {
  keyWord: string;
  list: TypeDataListWhole;
}) {
  return (
    <>
      <Head>
        <title>Movie Search</title>
        <meta name="description" content="Movie Search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <div className="flex" data-testid="app">
          <div className="grow-1 gap-y-10 flex-col flex">
            <SearchSection onSearch={keyWord} />
            <DataSection data={list} keyWord={keyWord} />

            <Paggination data={list} />
            <TestErrorBoundaryButton />
          </div>
        </div>
      </Layout>
    </>
  );
}
