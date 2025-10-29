import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'lg',
          transition: 'all 0.3s ease-in-out',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          },
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 'lg',
        transition: 'all 0.2s ease-in-out',
        _hover: {
          transform: 'scale(1.05)',
        },
      },
      variants: {
        gradient: {
          bg: 'linear-gradient(45deg, #553C9A, #00B5D8)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(45deg, #6B46C1, #00A3C4)',
          },
        },
        glowing: {
          bg: 'purple.500',
          color: 'white',
          boxShadow: '0 0 15px purple.200',
          _hover: {
            bg: 'purple.600',
            boxShadow: '0 0 20px purple.300',
          },
        },
      },
    },
    Progress: {
      baseStyle: {
        track: {
          bg: 'gray.100',
        },
        filledTrack: {
          bg: 'linear-gradient(45deg, #553C9A, #00B5D8)',
          transition: 'width 0.5s ease-in-out',
        },
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});