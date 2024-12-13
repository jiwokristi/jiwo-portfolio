import { CSSProperties } from "react";
import { Stack, StackProps, Typography, TypographyProps } from "@mui/material";

interface TextEffectProps extends TypographyProps {
  beforeSx?: CSSProperties;
  textContent: string;
  containerProps?: StackProps;
}

export const TextEffect = ({
  beforeSx,
  textContent,
  containerProps,
  sx,
  ...props
}: TextEffectProps) => {
  return (
    <Stack height="fit-content" overflow="hidden" {...containerProps}>
      <Typography
        {...props}
        position="relative"
        sx={{
          transition: "all 0.2s ease-in-out",

          "::before": {
            content: `'${textContent}'`,
            position: "absolute",
            top: 0,
            left: 0,

            width: "inherit",
            textAlign: "inherit",
            fontWeight: "inherit",
            transform: "translateY(100%)",
            transition: "all 0.2s ease-in-out",
            ...beforeSx,
          },
          ":hover": {
            transform: "translateY(-100%)",
          },
          ...sx,
        }}
      >
        {textContent}
      </Typography>
    </Stack>
  );
};
