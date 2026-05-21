"use client";

import { useParams } from "next/navigation";
import Formv1 from "@/app/oro/[version]/v1";
import Formv2 from "@/app/oro/[version]/v2";
import SplashScreenOro from "@/app/components/SplashScreen/SplashScreenOro";
import Formv3 from "@/app/oro/[version]/v3";
import Formv4 from "@/app/oro/[version]/v4";
import Formv5 from "@/app/oro/[version]/v5";
import Formv6 from "@/app/oro/[version]/v6";
import Formv7 from "@/app/oro/[version]/v7";
import Formv8 from "@/app/oro/[version]/v8";

export default function Home() {
  const { version } = useParams();

        if (version === "v8") {
    return (
      <SplashScreenOro>
        <Formv8 />
      </SplashScreenOro>
    );
  }

      if (version === "v7") {
    return (
      <SplashScreenOro>
        <Formv7 />
      </SplashScreenOro>
    );
  }

    if (version === "v6") {
    return (
      <SplashScreenOro>
        <Formv6 />
      </SplashScreenOro>
    );
  }

  if (version === "v5") {
    return (
      <SplashScreenOro>
        <Formv5 />
      </SplashScreenOro>
    );
  }

 if (version === "v4") {
    return (
      <SplashScreenOro>
        <Formv4 />
      </SplashScreenOro>
    )
  }
  if (version === "v3") {
    return (
      <SplashScreenOro>
        <Formv3 />
      </SplashScreenOro>
    )
  }

  if (version === "v2") {
    return (
      <SplashScreenOro>
        <Formv2 />
      </SplashScreenOro>
    )
  }

  return (
    <SplashScreenOro>
      <Formv1 />
    </SplashScreenOro>
  );
}
