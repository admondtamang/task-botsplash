import { IResponse } from "../types";

/**
 * The function fetches projects from a specific API endpoint based on the provided page number.
 * @param  - The `fetchProjects` function takes an object as a parameter with a property `page` of type
 * `number`. This `page` parameter is used to specify the page number for the API request.
 * @returns The function `fetchProjects` returns a Promise that resolves to an object of type
 * `IResponse`.
 */
export const fetchProjects = async ({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<IResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/repos/${search}?page=${page}`
  );
  return await res.json();
};
