import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { IRepo } from '../types';
import useDebounce from '../hooks/useDebounce';
import { fetchProjects } from '../queries/get.projects';

const InfinitePagination = () => {
  const [data, setData] = useState<IRepo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 600);

  const [ref, inView] = useInView({
    triggerOnce: false,
  });

  // ? trigger next page when last data is in view
  useEffect(() => {
    if (inView && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    if (!search) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { payload } = (await fetchProjects({ page, search: debouncedSearch })) || {};

        setData((prevData: any) => [...prevData, ...payload]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); // ? Fetch data when the page state changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
    setData([]);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} value={search} />
      <ul>
        {data.map((item: IRepo, i: number) => (
          <li className="card text-3xl" key={item?.id}>
            {i + 1} - {item?.name}
          </li>
        ))}
      </ul>
      <div ref={ref} style={{ height: '10px' }} />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfinitePagination;
