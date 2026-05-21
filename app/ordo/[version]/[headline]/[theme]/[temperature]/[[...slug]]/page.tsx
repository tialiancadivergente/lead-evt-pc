"use client";

import SplashScreen from "@/app/components/SplashScreen";
import Formv10 from "@/app/ordo/[version]/v10";
import Formv13 from "@/app/ordo/[version]/v13";
import Formv16 from "@/app/ordo/[version]/v16";
import Formv19 from "@/app/ordo/[version]/v19";
import Formv20 from "@/app/ordo/[version]/v20";
import Formv11 from "@/app/ordo/[version]/v11";
import Formv8 from "@/app/ordo/[version]/v8/indext";
import JourneySection from "@/components/journey-section"
import MentorSection from "@/components/mentor-section"
import Footer from "@/components/footer"
import { useParams } from "next/navigation";
import Formvt from "@/app/ordo/[version]/vt";
import Formv4 from "@/app/ordo/[version]/v4";
import SplashScreenV4 from "@/app/components/SplashScreen/SplashScreenV4";
import Formv3 from "@/app/ordo/[version]/v3";
import Formv4_2 from "@/app/ordo/[version]/v4-2";
import Formv5 from "@/app/ordo/[version]/v5";
import QuizV1 from "@/app/ordo/[version]/vq-1";
import FormvTeste from "@/app/ordo/[version]/teste";
import Formv21 from "@/app/ordo/[version]/v21";

export default function Home() {
  const { version, theme, slug } = useParams();

  const model = slug?.[0] || null;

  if (version === "vq-1") {
    return (
      <SplashScreenV4>
        <QuizV1 />
      </SplashScreenV4>
    );
  }

  if (version === "v3") {
    return (
      <SplashScreenV4>
        <Formv3 />
      </SplashScreenV4>
    );
  }

  if (version === "v4" && model === "2") {
    return (
      <SplashScreenV4>
        <Formv4_2 />
      </SplashScreenV4>
    );
  }

  if (version === "v4") {
    return (
      <SplashScreenV4>
        <Formv4 theme={theme as string} />
      </SplashScreenV4>
    );
  }

  if (version === "v5") {
    return (
      <SplashScreenV4>
        <Formv5/>
      </SplashScreenV4>
    );
  }

  if (version === "v8") {
    return (
      <SplashScreen>
        <Formv8 />
        <JourneySection />
        <MentorSection />
        <Footer />
      </SplashScreen>
    );
  }

  if (version === "v11") {
    return (
      <SplashScreen>
        <Formv11 />
      </SplashScreen>
    );
  }

  if (version === "v13") {
    return (
      <SplashScreen>
        <Formv13 />
      </SplashScreen>
    );
  }

  if (version === "v16") {
    return (
      <SplashScreen>
        <Formv16 />
      </SplashScreen>
    );
  }

  if (version === "v19") {
    return (
      <SplashScreen>
        <Formv19 />
      </SplashScreen>
    );
  }

  if (version === "vt") {
    return (
      <SplashScreen>
        <Formvt />
      </SplashScreen>
    );
  }

  if (version === "v20") {
    return (
      <SplashScreen>
        <Formv20 />
      </SplashScreen>
    );
  }

  if (version === "teste") {
    return (
      <SplashScreen>
        <FormvTeste />
      </SplashScreen>
    );
  }

  if (version === "v21") {
    return (
      <SplashScreen>
        <Formv21 />
      </SplashScreen>
    );
  }

  return (
    <SplashScreen>
      <Formv10 />
    </SplashScreen>
  );
}
