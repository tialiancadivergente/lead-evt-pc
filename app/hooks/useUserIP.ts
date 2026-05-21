"use client";

import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";

const useUserIP = () => {
  const [userIp, setUserIp] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/get-ip")
      .then((response) => response.json())
      .then((data) => {
        setUserIp(data.ip);

        // Enviar para o Google Tag Manager
        if (data.ip) {
          TagManager.dataLayer({
            dataLayer: {
              event: "IP",
              user_ip: data.ip,
            },
          });
        }
      })
      .catch((error) => console.error("Erro ao obter o IP:", error));
  }, []);

  return userIp;
};

export default useUserIP;
