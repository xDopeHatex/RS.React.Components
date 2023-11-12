import React from "react";
import { IMGAGE_URL } from "../constants/constants";
import { TypeDataItem } from "../types/types";

const Card = ({
  item,
  handleDetails,
}: {
  item: TypeDataItem;
  handleDetails: (idCur: number) => void;
}) => {
  return (
    <button
      data-testid="item"
      className="px-4 py-2 cursor-pointer"
      key={item.id}
      onClick={() => handleDetails(item.id)!}
    >
      {item.title}
      <img data-testid="testimg" src={`${IMGAGE_URL}${item.poster_path}`} />
    </button>
  );
};

export default Card;
