"use client";
import { useEffect } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
const BASE_URL = "http://localhost:6001/rs/v1 ";
const googleOneTapLogin = (data: any) => {
  const path = BASE_URL + "/auth/google/one-tap";
  return axios.post(path, data);
};

const GoogleOneTapLogin = () => {
  const router = useRouter();

  useEffect(() => {
    // will show popup after two secs
    const timeout = setTimeout(() => oneTap(), 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const oneTap = () => {
    if (typeof window === "undefined" || !window || localStorage.get("token"))
      return;
    console.log("init one tap");
    const { google } = window;
    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
        callback: async (response: any) => {
          call(response);
        },
      });

      google.accounts.id.prompt();

      google.accounts.id.prompt((notification: any) => {
        console.log(notification);
        if (notification.isNotDisplayed()) {
          console.log(
            "getNotDisplayedReason ::",
            notification.getNotDisplayedReason()
          );
        } else if (notification.isSkippedMoment()) {
          console.log("getSkippedReason  ::", notification.getSkippedReason());
        } else if (notification.isDismissedMoment()) {
          console.log(
            "getDismissedReason ::",
            notification.getDismissedReason()
          );
        }
      });
    }
  };

  const call = async (resp: any) => {
    try {
      const res = await googleOneTapLogin(resp);
      // xử lý response trả về
      router.push("/user");
    } catch (error) {
      console.debug(error);
      router.push("/auth/sign-in");
    }
  };
  return <div />;
};

export default GoogleOneTapLogin;
