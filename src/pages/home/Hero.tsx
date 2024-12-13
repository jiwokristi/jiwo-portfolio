import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Stack, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SectionKeys } from "@/utils/constants/section-keys";

import { TextEffect } from "@/components/TextEffect";

export const Hero = () => {
  const { t } = useTranslation();

  useEffect(() => {
    function infiniteReverse(this: GSAPTween) {
      this.totalTime(this.rawTime() + this.duration() + this.repeatDelay());
    }

    const tween = gsap.to(`.${SectionKeys.HOME_HERO}-marquee__inner`, {
      xPercent: -50,
      x: -175,
      duration: 15,
      repeat: -1,
      ease: "linear",
      onReverseComplete: infiniteReverse,
    });

    const scrollTrigger = ScrollTrigger.create({
      id: SectionKeys.HOME_HERO,
      trigger: "#" + SectionKeys.HOME_HERO,
      start: "top top",
      end: "bottom top",
      onUpdate: self => {
        const scrollVelocity = self.getVelocity();
        const baseSpeed = 1;
        const boostFactor = 0.005;

        const adjustedSpeed =
          baseSpeed + Math.abs(scrollVelocity) * boostFactor;

        tween.timeScale(self.direction === 1 ? adjustedSpeed : -adjustedSpeed);
      },
    });

    return () => {
      tween.kill();
      scrollTrigger.kill();
    };
  }, []);

  return (
    <Stack
      id={SectionKeys.HOME_HERO}
      component="section"
      justifyContent="space-between"
      pt="14rem"
      height="100vh"
      sx={{
        backgroundImage: "url('/img/home/jiwo.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        filter: "grayscale(100%)",

        "::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          bgcolor: "common.black",
          opacity: 0.6,
        },
      }}
    >
      <Box id={SectionKeys.HOME_HERO + "-nav"} component="nav">
        <Stack
          id={SectionKeys.HOME_HERO + "-nav-list"}
          component="ul"
          gap="0.4rem"
          px="3.2rem"
          zIndex={1}
          sx={({ breakpoints }) => ({
            [breakpoints.up("sm")]: {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          })}
        >
          <TextEffect
            component="span"
            variant="subtitle1"
            color="common.white"
            textContent={t("HOME.hero.nav.intro")}
            containerProps={{
              id: SectionKeys.HOME_HERO + "-nav-list__intro",
              component: "li",
              width: "23rem",
            }}
          />
          <TextEffect
            component="span"
            variant="subtitle1"
            color="common.white"
            textContent={t("HOME.hero.nav.work")}
            containerProps={{
              id: SectionKeys.HOME_HERO + "-nav-list__work",
              component: "li",
              width: "23rem",
            }}
          />
          <TextEffect
            component="span"
            variant="subtitle1"
            color="common.white"
            textContent={t("HOME.hero.nav.contact")}
            containerProps={{
              id: SectionKeys.HOME_HERO + "-nav-list__contact",
              component: "li",
              width: "23rem",
            }}
          />
        </Stack>
      </Box>
      <Box component="header" zIndex={1}>
        <Stack
          flexDirection="row"
          gap="35rem"
          maxWidth="100%"
          className={SectionKeys.HOME_HERO + "-marquee"}
          overflow="hidden"
        >
          {[...Array(2)].map((_, i) => (
            <Stack
              key={i}
              aria-hidden={i !== 0 ? "true" : "false"}
              flexDirection="row"
              gap="35rem"
              width="max-content"
              className={SectionKeys.HOME_HERO + "-marquee__inner"}
            >
              {[...Array(2)].map((_, idx) => (
                <Typography
                  key={idx}
                  variant="h1"
                  textTransform="uppercase"
                  color="common.white"
                  whiteSpace="nowrap"
                >
                  Jiwo Kristi
                </Typography>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
