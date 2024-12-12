import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import gsap from "gsap";
import Splitting from "splitting";

import { SectionKeys } from "@/utils/constants/section-keys";

import { TextEffect } from "@/components/TextEffect";

export const Intro = () => {
  useEffect(() => {
    Splitting({ target: "#Home-Intro-paragraph", by: "chars" });

    const charElements = document.querySelectorAll(
      "#Home-Intro-paragraph .char",
    );

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
  }, []);

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
      <Typography
        id="Home-Intro-paragraph"
        component="p"
        variant="h2"
        width="75%"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
        repellendus sint maiores necessitatibus suscipit consectetur omnis
        aliquam ea temporibus maxime, nam autem libero fuga nemo ullam totam
        exercitationem dolorem beatae. Deleniti debitis obcaecati fugiat,
        praesentium soluta, unde possimus tempora asperiores voluptatibus iure
        itaque? Molestiae provident sint quae officia fugit quibusdam eos magni,
        totam vel nulla id dolorum repellat et alias!
      </Typography>
    </Stack>
  );
};
