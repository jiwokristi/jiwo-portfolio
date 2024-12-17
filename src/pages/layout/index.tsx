import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Locales } from "@/utils/localization/i18n";

import { TextEffect } from "@/components/TextEffect";
import { Hamburger } from "@/components/Hamburger";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const growHandler = useCallback(
    function growHandler(type: "onEnter" | "onEnterBack") {
      gsap.to("#Hamburger-container", {
        scale: open
          ? 1
          : type === "onEnterBack" || window.scrollY === 0
            ? 0
            : 1,
        ease: "power4.inOut",
      });
    },
    [open],
  );

  useEffect(() => {
    const scrollTrigger = ScrollTrigger.create({
      id: "Hamburger-container",
      trigger: "body",
      start: "top -25%",
      end: "top -25%",
      onEnter: () => growHandler("onEnter"),
      onEnterBack: () => growHandler("onEnterBack"),
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [growHandler]);

  return createPortal(
    <>
      <Box
        id="Hamburger-container"
        position="fixed"
        top="3.2rem"
        right="3.2rem"
        zIndex={10000}
        sx={{ transform: "scale(0)" }}
      >
        <Hamburger
          open={open}
          onClick={() => {
            setOpen(p => {
              gsap.to("#Sidebar", {
                xPercent: p ? 100 : 0,
                x: 0,
                ease: "power2.inOut",
                onComplete: () => {
                  if (p && window.scrollY <= 100) {
                    gsap.to("#Hamburger-container", {
                      scale: 0,
                      ease: "power4.inOut",
                    });
                  }
                },
              });

              return !p;
            });
          }}
        />
      </Box>
      <Stack
        id="Sidebar"
        position="fixed"
        top={0}
        right={0}
        zIndex={9999}
        width="50vw"
        height="100vh"
        bgcolor="grey.900"
        sx={{ transform: "translateX(100%)" }}
      ></Stack>
    </>,
    document.querySelector("#portal")!,
  );
};

const Topbar = () => {
  const { t, i18n } = useTranslation();

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
    const tween = gsap.to("#Topbar", {
      yPercent: -100,
      y: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        id: "Topbar",
        trigger: "body",
        start: "top -20%",
        end: "top -20%",
        toggleActions: "play none reverse none",
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <Box
      id="Topbar"
      position="fixed"
      top={0}
      left={0}
      right={0}
      p="1.6rem 3.2rem"
      zIndex={9999}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextEffect
          component="span"
          variant="subtitle1"
          color="common.white"
          textContent="Denpasar, Indonesia"
          containerProps={{ id: "Topbar-location", width: "23rem" }}
        />
        <TextEffect
          component="span"
          variant="subtitle1"
          color="common.white"
          textContent={time + " (UTC+8)"}
          containerProps={{ id: "Topbar-localTime", width: "23rem" }}
        />
        {/* ----- LANGUAGE PICKER & DOWNLOAD CV ----- */}
        <Stack
          flexDirection="row"
          alignItems="center"
          gap="1.6rem"
          width="23rem"
        >
          <Stack
            id="Topbar-languagePicker"
            flexDirection="row"
            alignItems="center"
            gap="0.8rem"
          >
            <TextEffect
              component="span"
              role="button"
              onClick={() => i18n.changeLanguage(Locales.ID)}
              variant="subtitle1"
              color="common.white"
              textContent="ID"
              sx={{
                fontWeight: i18n.language === Locales.ID ? 700 : 500,
                cursor: "pointer",
              }}
              containerProps={{
                overflow: "hidden",
                className: "Topbar-languagePicker-id",
              }}
            >
              ID
            </TextEffect>
            <Typography
              component="span"
              variant="subtitle1"
              color="common.white"
            >
              /
            </Typography>
            <TextEffect
              component="span"
              role="button"
              onClick={() => i18n.changeLanguage(Locales.EN)}
              variant="subtitle1"
              color="common.white"
              textContent="EN"
              sx={{
                fontWeight: i18n.language === Locales.EN ? 700 : 500,
                cursor: "pointer",
              }}
              containerProps={{
                overflow: "hidden",
                className: "Topbar-languagePicker-en",
              }}
            >
              EN
            </TextEffect>
          </Stack>
          <Button
            id="Topbar-downloadCv"
            component="a"
            href="/pdf/Jiwo Kristi-resume.pdf"
            download
            variant="outlined"
            sx={{
              flex: "1",
              border: theme => `1px solid ${theme.palette.common.white}`,
              borderRadius: 0,
            }}
          >
            <TextEffect
              component="span"
              textContent={t("TOPBAR.download-cv")}
              variant="subtitle1"
              color="common.white"
            />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export const RootLayout = () => {
  return (
    <>
      <Topbar />
      <Sidebar />
      <Outlet />
    </>
  );
};
