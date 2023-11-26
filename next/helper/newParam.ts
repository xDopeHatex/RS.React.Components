export const newParam = (page?: string | null, q?: string | null) => {
  const newPage =
    page && Number(page) ? "page=" + String(Number(page)) : undefined;

  const newQ = q ? "q=" + q : undefined;

  const newParams = [];
  if (newPage) newParams.push(newPage);

  if (newQ) newParams.push(newQ);

  return newParams.length ? "?" + newParams.join("&") : "";
};
