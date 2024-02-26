import { useEffect, useState } from "react";

// Custom Componets Import
import api from "helpers/API/BaseApi";

const useGetAdverts = () => {
  const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
  const token = profile.token;
  const userId = profile.userId;

  const [adverts, setAdverts] = useState(null);

  useEffect(() => {
    const fetchData = async () =>
      await api
        .get(`${"api/MQCustomerDashboard/GetMarquees"}?UserId=${userId}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.marqueeDashboard;
          setAdverts(data);
        })
        .catch((error) => {
          console.log(error.response);
        });

    fetchData();
  }, []);

  return adverts;
};

export default useGetAdverts;
