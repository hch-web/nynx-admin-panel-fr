const { createTheme } = require('@mui/material');

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',

    h1: {
      fontSize: '48px',
      fontWeight: '500',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '35px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '30px',
      },

      '@media (max-width: 570px)': {
        fontSize: '25px',
      },
    },

    h2: {
      fontSize: '45px',
      fontWeight: '500',
      textTransform: 'capitalize',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '32px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '28px',
      },

      '@media (max-width: 570px)': {
        fontSize: '22px',
      },
    },

    h3: {
      fontSize: '30px',
      fontWeight: '500',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '24px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '22px',
      },

      '@media (max-width: 570px)': {
        fontSize: '18px',
      },
    },

    h5: {
      fontSize: '24px',
      fontWeight: '500',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '20px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '18px',
      },

      '@media (max-width: 570px)': {
        fontSize: '16px',
      },
    },

    h6: {
      fontSize: '18px',
      fontWeight: '400',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '17px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '16px',
      },

      '@media (max-width: 570px)': {
        fontSize: '15px',
      },
    },

    desktopParagraph: {
      fontSize: '16px',
      fontFamily: 'Poppins, sans-serif',
    },

    body1: {
      fontSize: '16px',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    label: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '15px',
      color: '#422438',
      fontWeight: '500',

      '@media (max-width: 540px)': {
        fontSize: '14px',
      },
    },

    p: {
      '@media (min-width: 1650px) and (max-width: 1950px)': {
        fontSize: '18px',
      },
      '@media (min-width: 1950px)': {
        fontSize: '20px',
      },
    },

    cardPriceTitle: {},

    title: {
      fontSize: '20px',
      fontFamily: 'Poppins, sans-serif',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    caption: {
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
    },

    caption1: {
      fontSize: '13px',
      fontFamily: 'Poppins, sans-serif',
    },

    caption2: {
      fontSize: '12px',
      fontFamily: 'Poppins, sans-serif',
    },

    caption3: {
      fontSize: '10px',
      fontFamily: 'Poppins, sans-serif',
    },

    dashboardh1: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '24px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh2: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '20px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh3: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '18px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '15px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh4: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '19px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh5: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '18px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardh6: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '16px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    dashboardBody: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '14px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '12px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '10px',
      },

      '@media (max-width: 570px)': {
        fontSize: '10px',
      },
    },

    dashboardCaption: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '15px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '12px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '10px',
      },

      '@media (max-width: 570px)': {
        fontSize: '10px',
      },
    },

    dashboardCaption2: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '12px',
      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '10px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '8px',
      },

      '@media (max-width: 570px)': {
        fontSize: '8px',
      },
    },

    workspaceTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#422438',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '16px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '15px',
      },

      '@media (max-width: 570px)': {
        fontSize: '14px',
      },
    },

    workspaceSubTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#422438',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '14px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '14px',
      },

      '@media (max-width: 570px)': {
        fontSize: '13px',
      },
    },

    countDownTimer: {
      fontFamily: 'Roboto Flex, sans-serif',
      fontSize: '22px',
      fontWeight: '700',
      color: '#422438',
      background: '#ffe3c5',
      padding: '2px 5px',
      borderRadius: '5px',
      lineHeight: '22px',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '20px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '18px',
      },

      '@media (max-width: 570px)': {
        fontSize: '16px',
      },
    },

    overTimeTimer: {
      fontFamily: 'Roboto Mono !important',
      fontSize: '22px',
      fontWeight: '700',
      color: '#422438',
      background: '#FF7262',
      padding: '2px 5px',
      borderRadius: '5px',
      lineHeight: '22px',

      '@media (min-width: 768px) and (max-width: 991px)': {
        fontSize: '20px',
      },

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '18px',
      },

      '@media (max-width: 570px)': {
        fontSize: '16px',
      },
    },

    timerLabel: {
      fontFamily: 'Roboto Mono !important',
      fontSize: '11px',
      fontWeight: '700',
      color: '#a0919b',

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '12px',
      },

      '@media (max-width: 570px)': {
        fontSize: '11px',
      },
    },

    professionLabel: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '10px',
      color: '#a0919b',

      '@media (max-width: 768px) and (min-width: 570px)': {
        fontSize: '10px',
      },

      '@media (max-width: 570px)': {
        fontSize: '10px',
      },
    },
  },

  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: 'transparent!important',
          boxShadow: 'none!important',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: 'none',
          border: '1px solid #cccfcd',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: '#422438',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '6px 28px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          boxShadow: 'none',
          textTransform: 'none',

          ':hover': {
            background: '#FFE3C5',
            color: '#422438',
            boxShadow: 'none',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '8px 25px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '6px 20px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '6px 18px',
            fontSize: '14px',
          },
        },

        outlinedPrimary: {
          borderColor: '#422438',
          color: '#422438',
          borderRadius: '20px',
          padding: '6px 28px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          boxShadow: 'none',
          textTransform: 'none',

          '&:hover': {
            borderColor: '#422438',
            background: '#ffe3c5',
            color: '#422438',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '5px 25px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '5px 20px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '5px 18px',
            fontSize: '14px',
          },
        },

        outlinedSecondary: {
          borderColor: '#c1c1c1',
          color: '#000',
          borderRadius: '20px',
          padding: '6px 28px',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '16px',
          boxShadow: 'none',
          textTransform: 'none',

          '&:hover': {
            // borderColor: '#c1c1c1',
            background: '#FFE3C5',
            color: '#000',
          },

          // '@media (min-width: 768px) and (max-width: 991px)': {
          //   padding: '12px 24px',
          // },

          // '@media (max-width: 768px) and (min-width: 570px)': {
          //   padding: '10px 20px',
          //   fontSize: '15px',
          // },

          // '@media (max-width: 570px)': {
          //   padding: '8px 18px',
          //   fontSize: '14px',
          // },
        },
        success: {
          background: '#ebf9ed',
          borderRadius: '5px',
          padding: '6px 28px',
          color: '#32C850',
          textTransform: 'capitalize',

          '&:hover': {
            background: '#d9eddb',
            color: '#32C859',
          },

          '@media (min-width: 768px) and (max-width: 991px)': {
            padding: '5px 15px',
          },

          '@media (max-width: 768px) and (min-width: 570px)': {
            padding: '5px 12px',
            fontSize: '15px',
          },

          '@media (max-width: 570px)': {
            padding: '5px 10px',
            fontSize: '14px',
          },
        },
      },
    },

    MuiDivider: {
      defaultProps: {
        color: 'grey',
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },

  palette: {
    primary: {
      main: '#422438',
    },

    basicWhite: {
      main: '#FFF6EC',
    },

    lightYellow: {
      main: '#ffe3c5',
    },

    darkYellow: {
      main: '#EDB42F',
    },

    yellow: {
      main: '#FAC751',
    },

    lightOrange: {
      main: '#FEA87E',
    },

    lightPink: {
      main: '#FFF6EC',
    },

    darkPink: {
      main: '#F1416C',
    },

    paleOrange: {
      main: '#FFF2D0',
    },

    darkPurple: {
      main: '#422438',
      textContrast: '#FFF2D0',
    },

    parrot: {
      main: '#50CD89',
    },

    grey: {
      main: '#e3dee1',
      dark: '#A0919B',
      light: '#ece9eb',
    },

    lightGrey: {
      main: '#E3D6D1',
    },

    red: {
      main: '#A23842',
      dark: '#F15642',
    },

    brown: {
      main: '#6A2837',
    },

    darkBlue: {
      main: '#011F42',
    },

    lightBlue: {
      main: '#B3DDF0',
    },

    darkPaleOrange: {
      main: '#F8D19E',
    },

    success: {
      main: '#32C850',
    },

    border: {
      main: '#ECE9EB',
    },

    black: {
      main: '#000000',
      contrast: '#3F4254',
      greyishBlack: '#212121',
    },

    hover: {
      main: '#fff1e2',
    },
    // primary: {
    //   main: '#002E6D',
    //   contrastText: '#ffffff',
    // },
    secondary: {
      main: '#e4e4e4',
      contrastText: '#000',
      // contrastText: '#0C0B57',
    },
    whiteColor: {
      main: '#FFFFFF',
    },
    mutedColor: {
      main: '#e4e4e4',
      contrastText: '#000',
    },
  },
});

export default theme;
