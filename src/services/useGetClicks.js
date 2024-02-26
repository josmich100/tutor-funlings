import { useEffect, useState } from "react";

// Custom Componets Import
import api from "helpers/API/BaseApi";

const useGetClicks = () => {
  const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
  const token = profile.token;
  const userId = profile.userId;

  const [lifetimeClicks, setLifetimeClicks] = useState(0);

  useEffect(() => {
    const fetchData = async () =>
      await api
        .get(`${"api/MQCustomerDashboard/GetClicks"}?UserId=${userId}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.marqueeImpressionsClicks?.allClicks;
          setLifetimeClicks(data);
        })
        .catch((error) => {
          console.log(error.response);
        });

    fetchData();
  }, []);

  return lifetimeClicks;
};

export default useGetClicks;
