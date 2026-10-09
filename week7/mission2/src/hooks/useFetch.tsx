import { useEffect, useState } from "react";

/**
 * 
 * @param fetcher : 실제 데이터를 가져오는 비동기 함수를 인자로 받음
 * @param deps : useEffect의 의존성 배열을 외부에서 받을 수 있음 -> 특정 값이 바뀔 때만 데이터를 다시 가져오게 할 수 있음 
 */

export default function useFetch <T> (fetcher: ()=> Promise<T>, deps: any[]=[]) {
  const [data, setData] = useState<T | null> (null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(()=> {
      const fetchData = async() => {
        setIsPending(true);

        try{
          const result = await fetcher ();
          setData(result);
        } catch (err){
          setIsError(true);
        } finally {
          setIsPending(false);
        }
      }
      fetchData();
  }, deps); // deps 배열이 바뀔 때 마다 fetchData() 실행

  return { data, isPending, isError };
}
