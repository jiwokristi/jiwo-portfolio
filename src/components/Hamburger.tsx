import { Box, IconButton, IconButtonProps } from "@mui/material";

interface HamburgerProps extends IconButtonProps {
  open: boolean;
}

export const Hamburger = ({ open, sx, ...props }: HamburgerProps) => {
  return (
    <IconButton
      disableRipple
      sx={{
        position: "relative",

        p: 0,
        width: "9.6rem",
        height: "9.6rem",
        bgcolor: "common.white",
        border: theme => `1px solid ${theme.palette.grey["900"]}`,
        borderRadius: 9999,
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "all 300ms ease-in-out",

        ":hover": {
          bgcolor: "common.white",
        },
        ...sx,
      }}
      className="btn__Hamburger"
      {...props}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="3.2rem"
        height="0.25rem"
        bgcolor="grey.900"
        borderRadius={9999}
        sx={{
          transform: open
            ? "translate(-50%, -50%) rotate(45deg)"
            : "translate(-50%, calc(-50% - 0.4rem))",
          transition: "all 300ms ease-in-out",
        }}
        className="btn__Hamburger-BurgerLine"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="3.2rem"
        height="0.25rem"
        bgcolor="grey.900"
        borderRadius={9999}
        sx={{
          transform: open
            ? "translate(-50%, -50%) rotate(-45deg)"
            : "translate(-50%, calc(-50% + 0.4rem))",
          transition: "all 300ms ease-in-out",
        }}
        className="btn__Hamburger-BurgerLine"
      />
      {/* <BurgerLine
        sx={{
        	transform: open
        		? "rotate(45deg)" // Less translateY for a balanced X
        		: "translateY(-0.9rem) rotate(0deg)", // Adjusted position
        }}
        className="btn__Hamburger-BurgerLine"
      />
      <BurgerLine
        sx={{
        	transform: open
        		? "rotate(-45deg) " // Less translateY for symmetry
        		: "translateY(0.9rem) rotate(0deg)", // Adjusted position
        }}
        className="btn__Hamburger-BurgerLine"
      /> */}
    </IconButton>
  );
};
