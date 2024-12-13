import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Stack } from "@mui/material";
import gsap from "gsap";
import Splitting from "splitting";

import { SectionKeys } from "@/utils/constants/section-keys";

import { TextEffect } from "@/components/TextEffect";

export const Intro = () => {
  const { t, i18n } = useTranslation();

  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const [paragraph, setParagraph] = useState<HTMLParagraphElement>();

  useEffect(() => {
    const paragraphEl = document.createElement("p");
    paragraphEl.id = "Home-Intro-paragraph";
    paragraphEl.style.fontFamily = "Poppins, sans-serif";
    paragraphEl.style.fontWeight = "500";
    paragraphEl.style.lineHeight = "1.2";
    paragraphEl.style.fontSize = "6.4rem";
    paragraphEl.innerHTML = t("HOME.intro.paragraph");

    Splitting({
      target: paragraphEl,
      by: "chars",
    });

    setParagraph(paragraphEl);
  }, [i18n.language, t]);

  useEffect(() => {
    if (paragraph && paragraphRef.current) {
      paragraphRef.current.innerHTML = "";
      paragraphRef.current.appendChild(paragraph);

      const charElements = paragraph.querySelectorAll(".char");

      const tl = gsap
        .timeline({
          scrollTrigger: {
            id: SectionKeys.HOME_INTRO,
            trigger: "#" + SectionKeys.HOME_INTRO,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1,
          },
        })
        .fromTo(
          charElements,
          { autoAlpha: 0.4 },
          { autoAlpha: 1, stagger: 0.05, duration: 2 },
        );

      return () => {
        tl.kill();
      };
    }
  }, [paragraph]);

  return (
    <Stack
      id={SectionKeys.HOME_INTRO}
      component="section"
      flexDirection="row"
      justifyContent="space-between"
      p="9.6rem 3.2rem"
      bgcolor="common.white"
    >
      <TextEffect
        variant="h2"
        textContent="Intro"
        containerProps={{ component: "header" }}
      />
      <Box ref={paragraphRef} width="75%"></Box>
    </Stack>
  );
};
