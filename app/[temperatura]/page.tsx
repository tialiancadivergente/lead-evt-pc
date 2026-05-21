"use client";

import { Suspense } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import JourneySection from "@/components/journey-section";
import MentorSection from "@/components/mentor-section";
import Footer from "@/components/footer";
import SplashScreen from "../components/SplashScreen";
import HomeContent from "../components/HomeContent";
import LoadingFallback from "../components/LoadingFallback";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Form from "./form-v1";
import QuizFormInlead from "./inlead";
import Formv10 from "./form-v10";
import HeroSectionV3 from "@/components/hero-section-v3";
import SplashScreenV4 from "../components/SplashScreen/SplashScreenV4";
import HeroSectionV2 from "@/components/hero-section-v2";

export default function Home() {
  const params = useParams();
  const temperatura = params.temperatura as string;
  const paramsSplit = temperatura.split("-");

  const versao = params.versao as string;
  let form;
  if (temperatura.indexOf("v1") != -1) {
    form = "v1";
  } else if (paramsSplit[1] === "v2") {
    form = "v2";
  } else if (paramsSplit[1] === "v3") {
    form = "v3";
  } else {
    form = "v9";
  }

  if (paramsSplit[1] === "v10") {
    return (
      <SplashScreen>
        <Formv10 />
      </SplashScreen>
    );
  }

  if (temperatura.indexOf("survey") != -1) {
    return <QuizFormInlead />;
  }

  if (form === "v1") {
    return <Form />;
  }

  if (form === "v2") {
    return (
      <SplashScreenV4>
        <main>
          <HeroSectionV2 />
        </main>
      </SplashScreenV4>
    );
  }

  if (form === "v3") {
    return (
      <SplashScreenV4>
        <main>
          <Header />
          <HeroSectionV3 />
          <JourneySection />
          <MentorSection />
          <Footer />
        </main>
      </SplashScreenV4>
    );
  }

  return (
    <SplashScreen>
      <main>
        <Header />
        <HeroSection />
        <JourneySection />
        <MentorSection />
        <Footer />
      </main>
    </SplashScreen>
  );
}
