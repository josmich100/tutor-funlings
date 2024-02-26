import { useEffect, useState } from "react";

// Custom Componets Import
import api from "helpers/API/BaseApi";

const useGetLifeTimeImpressions = () => {
  const profile = JSON.parse(localStorage.getItem("authFunStudnt"));
  const token = profile.token;
  const userId = profile.userId;

  const [lifetimeImpressions, setLifetimeImpressions] = useState(0);

  useEffect(() => {
    const fetchData = async () =>
      await api
        .get(`${"api/MQCustomerDashboard/GetImpressions"}?UserId=${userId}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.marqueeImpressionsClicks?.allImpressions;
          setLifetimeImpressions(data);
        })
        .catch((error) => {
          console.log(error.response);
        });

    fetchData();
  }, []);

  return lifetimeImpressions;
};

export default useGetLifeTimeImpressions;
