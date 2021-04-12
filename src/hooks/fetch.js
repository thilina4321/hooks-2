import  { useCallback, useEffect, useState } from 'react'

const useFetch = () => {
    const [data, setData] = useState()

    const search = useCallback(()=>{
        fetch("https://simple-1db1e-default-rtdb.firebaseio.com/ings.json")
        .then((res)=>res.json())
        .then(resData=>{
          console.log(resData);
          setData(resData)
        })
    },[])

    useEffect(() => {
        search()
      }, [search]);

    return [data, search]
}

export default useFetch
