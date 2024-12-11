import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { SectionKeys } from "@/utils/constants/section-keys";

import { Hero } from "./Hero";
import { Intro } from "./Intro";

export const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const intersectionHandler = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          let title: string | undefined;

          switch (sectionId) {
            case SectionKeys.HOME_HERO:
              title = "Jiwo Kristi";
              break;
            case SectionKeys.HOME_INTRO:
              title = t("HEAD.title.intro");
              break;

            default:
              title = "Jiwo Kristi";
              break;
          }

          if (title) {
            document.title = title;
          }
        }
      });
    };

    const observer = new IntersectionObserver(intersectionHandler, {
      root: null, // Use the viewport as the root.
      threshold: 0.5, // Trigger when at least 50% of the section is in the viewport.
    });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [t]);

  return (
    <>
      <Hero />
      <Intro />
    </>
  );
};
