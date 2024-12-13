import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import gsap from "gsap";

import { Locales } from "@/utils/localization/i18n";

import { TextEffect } from "@/components/TextEffect";

const Navbar = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const tween = gsap.to("#Navbar", {
      yPercent: -100,
      y: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        id: "Navbar",
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
      id="Navbar"
      component="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      p="1.6rem 3.2rem"
      zIndex={9999}
    >
      <Stack
        id="Navbar-listContainer"
        component="ul"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
        gap="0.8rem"
      >
        <Stack component="li" overflow="hidden" className="Navbar-listItem">
          <TextEffect
            id="Navbar-listItem-language-id"
            component="span"
            role="button"
            onClick={() => i18n.changeLanguage(Locales.ID)}
            textContent="ID"
            fontSize="1.6rem"
            color="common.white"
            sx={{
              fontWeight: i18n.language === Locales.ID ? 700 : 500,
              cursor: "pointer",
            }}
          >
            ID
          </TextEffect>
        </Stack>
        <Stack component="li" overflow="hidden" className="Navbar-listItem">
          <Typography component="span" fontSize="1.6rem" color="common.white">
            /
          </Typography>
        </Stack>
        <Stack component="li" overflow="hidden" className="Navbar-listItem">
          <TextEffect
            id="Navbar-listItem-language-en"
            component="span"
            role="button"
            onClick={() => i18n.changeLanguage(Locales.EN)}
            textContent="EN"
            fontSize="1.6rem"
            color="common.white"
            sx={{
              fontWeight: i18n.language === Locales.EN ? 700 : 500,
              cursor: "pointer",
            }}
          >
            EN
          </TextEffect>
        </Stack>
      </Stack>
    </Box>
  );
};

export const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
