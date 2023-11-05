import { useNavigate } from "react-router-dom";

const Paggination = ({
  allPages,
  currentPage,
  setPage,
}: {
  allPages: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-wrap max-w-[60vw] gap-2 text-white">
      <button
        className="flex justify-center items-center cursor-pointer"
        disabled={currentPage == 1}
        onClick={() => setPage((prev: number) => prev - 1)}
      >
        {`<=`}
      </button>
      {/*first*/}
      {currentPage > 1 && (
        <span
          className={`p-4 rounded-xl bg-teal-500 cursor-pointer`}
          onClick={() => setPage(1)}
        >
          {allPages ? 1 : "unknown"}
        </span>
      )}
      {/*current*/}

      <span
        className={`p-4 rounded-xl bg-teal-800 text-white cursor-pointer`}
        onClick={() => setPage(currentPage)}
      >
        {currentPage ? currentPage : "unknown"}
      </span>

      {/*last*/}
      {currentPage !== allPages && (
        <span
          className={`p-4 rounded-xl bg-teal-500 text-white cursor-pointer`}
          onClick={() => setPage(allPages)}
        >
          {allPages ? allPages : "unknown"}
        </span>
      )}
      <button
        className="flex justify-center items-center "
        disabled={currentPage === allPages}
        onClick={() => setPage((prev: number) => prev + 1)}
      >{`=>`}</button>
    </div>
  );
};

export default Paggination;
