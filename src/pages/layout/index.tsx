import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import {
  Box,
  Button,
  ButtonProps,
  darken,
  Stack,
  Typography,
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Locales } from "@/utils/localization/i18n";
import { SectionKeys } from "@/utils/constants/section-keys";

import { TextEffect } from "@/components/TextEffect";
import { Hamburger } from "@/components/Hamburger";

const DownloadCv = ({ sx, ...props }: ButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      component="a"
      href="/pdf/Jiwo Kristi-resume.pdf"
      download
      variant="outlined"
      sx={{
        flex: "1",

        height: "fit-content",
        border: theme => `1px solid ${theme.palette.common.white}`,
        borderRadius: 0,

        ":hover": {
          bgcolor: "transparent",
        },
        ...sx,
      }}
      {...props}
    >
      <TextEffect
        component="span"
        textContent={t("TOPBAR.download-cv")}
        variant="subtitle1"
        color="common.white"
      />
    </Button>
  );
};

const LanguagePicker = ({ isSidebar }: { isSidebar?: boolean }) => {
  const { i18n } = useTranslation();

  return (
    <Stack flexDirection="row" alignItems="center" gap="1.6rem" width="23rem">
      <Stack
        id={isSidebar ? "Sidebar-languagePicker" : "Topbar-languagePicker"}
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
            id: isSidebar
              ? "Sidebar-languagePicker-id"
              : "Topbar-languagePicker-id",
          }}
        >
          ID
        </TextEffect>
        <Typography component="span" variant="subtitle1" color="common.white">
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
            id: isSidebar
              ? "Sidebar-languagePicker-en"
              : "Topbar-languagePicker-en",
          }}
        >
          EN
        </TextEffect>
      </Stack>
      {!isSidebar && <DownloadCv id="Topbar-downloadCv" />}
    </Stack>
  );
};

const Sidebar = ({ time }: { time: string }) => {
  const { t } = useTranslation();

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
        gap="3.2rem"
        p="6.4rem 4.8rem"
        width="50vw"
        height="100vh"
        bgcolor={theme => darken(theme.palette.grey["900"], 0.3)}
        sx={{ transform: "translateX(100%)" }}
      >
        <Stack id="Sidebar-nav" component="nav" gap="2.4rem" flex="1">
          <Box
            id="Sidebar-nav-header"
            component="header"
            width="calc(100% - 12rem)"
          >
            <Typography
              component="h6"
              pb="1.6rem"
              fontWeight={500}
              fontSize="1.2rem"
              textTransform="uppercase"
              color="grey.600"
              borderBottom={theme => `1px solid ${theme.palette.grey["600"]}`}
            >
              {t("COMMON.navigation")}
            </Typography>
          </Box>
          <Stack
            id="Sidebar-nav-list"
            component="ul"
            flex="1"
            justifyContent="space-evenly"
          >
            <Stack
              id="Sidebar-nav-list__intro"
              component="li"
              flexDirection="row"
              alignItems="center"
            >
              <Typography
                role="link"
                component="p"
                variant="h2"
                color="common.white"
                onClick={() => {
                  gsap.to(window, {
                    scrollTo: {
                      y: "#" + SectionKeys.HOME_INTRO,
                      autoKill: false,
                    },
                    ease: "power2.inOut",
                  });
                }}
                sx={{ cursor: "pointer" }}
              >
                {t("NAVIGATION.intro")}
              </Typography>
            </Stack>
            <Stack
              id="Sidebar-nav-list__work"
              component="li"
              flexDirection="row"
              alignItems="center"
            >
              <Typography
                role="link"
                component="p"
                variant="h2"
                color="common.white"
                // sx={{ cursor: "pointer" }}
              >
                {t("NAVIGATION.work")}
              </Typography>
            </Stack>
            <Stack
              id="Sidebar-nav-list__contact"
              component="li"
              flexDirection="row"
              alignItems="center"
            >
              <Typography
                role="link"
                component="p"
                variant="h2"
                color="common.white"
                // sx={{ cursor: "pointer" }}
              >
                {t("NAVIGATION.contact")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box
          id="Sidebar-list"
          component="ul"
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          alignItems="flex-end"
          rowGap="2.4rem"
        >
          <Stack id="Sidebar-list__location" component="li" gap="0.8rem">
            <Typography
              fontWeight={500}
              fontSize="1.2rem"
              textTransform="uppercase"
              color="grey.600"
            >
              {t("COMMON.location")}
            </Typography>
            <TextEffect
              component="span"
              variant="subtitle1"
              color="common.white"
              textContent="Denpasar, Indonesia"
            />
          </Stack>
          <Stack id="Sidebar-list__localTime" component="li" gap="0.8rem">
            <Typography
              fontWeight={500}
              fontSize="1.2rem"
              textTransform="uppercase"
              color="grey.600"
            >
              {t("COMMON.local-time")}
            </Typography>
            <TextEffect
              component="span"
              variant="subtitle1"
              color="common.white"
              textContent={time + " (UTC+8)"}
            />
          </Stack>
          <Stack id="Sidebar-list__languagePicker" component="li" gap="0.8rem">
            <Typography
              fontWeight={500}
              fontSize="1.2rem"
              textTransform="uppercase"
              color="grey.600"
            >
              {t("COMMON.language")}
            </Typography>
            <LanguagePicker isSidebar />
          </Stack>
          <Stack id="Sidebar-list__socials" component="li" gap="0.8rem">
            <Typography
              fontWeight={500}
              fontSize="1.2rem"
              textTransform="uppercase"
              color="grey.600"
            >
              {t("COMMON.socials")}
            </Typography>
            <TextEffect
              component="a"
              target="_blank"
              href="https://www.linkedin.com/in/jiwokristi/"
              variant="subtitle1"
              color="common.white"
              textContent="LinkedIn"
              sx={{ textDecoration: "none" }}
              containerProps={{ id: "Sidebar-socials__LinkedIn" }}
            />
          </Stack>
          <TextEffect
            component="a"
            target="_blank"
            href="https://github.com/jiwokristi"
            variant="subtitle1"
            color="common.white"
            textContent="GitHub"
            sx={{ textDecoration: "none" }}
            containerProps={{ id: "Sidebar-socials__GitHub", component: "li" }}
          />
          <DownloadCv id="Sidebar-downloadCv" />
        </Box>
      </Stack>
    </>,
    document.querySelector("#portal")!,
  );
};

const Topbar = ({ time }: { time: string }) => {
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
        <LanguagePicker />
      </Stack>
    </Box>
  );
};

export const RootLayout = () => {
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

  return (
    <>
      <Topbar time={time} />
      <Sidebar time={time} />
      <Outlet />
    </>
  );
};
