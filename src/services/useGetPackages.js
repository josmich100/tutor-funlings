import { useEffect, useState } from "react";

// Custom Componets Import
import api from "helpers/API/BaseApi";

const useGetPackages = () => {
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    const fetchData = async () =>
      await api
        .get("api/MQLookups/GetMarqueePackages", {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
        .then(response => {
          const data = response.data.marqueePackages;
          setPackages(data);
        })
        .catch(error => {
          console.log(error.response);
        });

    fetchData();
  }, []);

  return packages;
};

export default useGetPackages;
