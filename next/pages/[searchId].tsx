import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import SearchSection from "@/components/SearchSection";
import DataSection from "@/components/DataSection";
import Paggination from "@/components/Paggination";
import { GetServerSideProps } from "next";
import TestErrorBoundaryButton from "@/components/TestErrorBoundaryButton";
import {
  TypeDataList,
  TypeDataListWhole,
  TypeFilmDetails,
} from "@/types/types";
import { searchPageHandler, getDetailedMovie } from "@/pages/api/fetch";
import Details from "@/components/Details";
import Layout from "@/components/Layout";

export const getServerSideProps = async (context: any) => {
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

  const searchId = context.query.searchId;

  const details: TypeFilmDetails =
    searchId && (await getDetailedMovie(searchId));

  return {
    props: {
      list: responseData,
      keyWord: q,
      searchId: searchId,
      details: details,
    },
  };
};

export default function Home({
  list,
  keyWord,
  searchId,
  details,
}: {
  keyWord: string;
  list: TypeDataListWhole;
  searchId: string | number;
  details: TypeFilmDetails;
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

          <Details id={searchId} data={details} keyWord={keyWord} />
        </div>
      </Layout>
    </>
  );
}
