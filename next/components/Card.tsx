import React from "react";
import { IMGAGE_URL } from "@/constants/constants";
import { TypeDataItem } from "../types/types";
import Link from "next/link";

const Card = ({
  item,
  searchParam,
}: {
  item: TypeDataItem;
  searchParam: string;
}) => {
  return (
    <Link
      data-testid="item"
      className="px-4 py-2 cursor-pointer"
      key={item.id}
      href={`/${item.id.toString()}` + searchParam}
    >
      {item.title}
      <img data-testid="testimg" src={`${IMGAGE_URL}${item.poster_path}`} />
    </Link>
  );
};

export default Card;
