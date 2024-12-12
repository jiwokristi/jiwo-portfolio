import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SectionKeys } from "@/utils/constants/section-keys";

import { TextEffect } from "@/components/TextEffect";

export const Hero = () => {
  const [time, setTime] = useState(
    new Intl.DateTimeFormat("en-ID", {
      // Denpasar is in the "Asia/Makassar" timezone.
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date()),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Intl.DateTimeFormat("en-ID", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());

      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function infiniteReverse(this: GSAPTween) {
      this.totalTime(this.rawTime() + this.duration() + this.repeatDelay());
    }

    const tween = gsap.to(".scroller__inner", {
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
        tween.timeScale(self.direction === 1 ? 1 : -1);
        console.log("self", self);
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
      pt="8.8rem"
      pb="3.2rem"
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
          opacity: 0.5,
        },
      }}
    >
      <Stack
        id="Home-Hero-info"
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
          fontStyle="italic"
          variant="subtitle1"
          color="common.white"
          textContent="Full Stack Developer"
          containerProps={{ id: "Home-Hero-info__jobTitle" }}
        />
        <TextEffect
          component="span"
          variant="subtitle1"
          color="common.white"
          textContent="Denpasar, Indonesia"
          containerProps={{ id: "Home-Hero-info__location" }}
        />
        <TextEffect
          component="span"
          width="19rem"
          variant="subtitle1"
          color="common.white"
          textAlign="right"
          textContent={time + " (UTC+8)"}
          containerProps={{ id: "Home-Hero-info__currentTime" }}
        />
      </Stack>
      <Box component="header" zIndex={1}>
        <Stack
          flexDirection="row"
          gap="35rem"
          maxWidth="100%"
          className="scroller"
          overflow="hidden"
        >
          {[...Array(2)].map((_, i) => (
            <Stack
              key={i}
              aria-hidden={i !== 0 ? "true" : "false"}
              flexDirection="row"
              gap="35rem"
              width="max-content"
              className="scroller__inner"
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
