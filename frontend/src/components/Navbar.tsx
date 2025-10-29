import React from 'react';
import {
  Box,
  Flex,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={bg} px={4} boxShadow="lg">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md">MindScape</Heading>

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Link as={RouterLink} to="/">Dashboard</Link>
            <Link as={RouterLink} to="/study-tools">Study Tools</Link>
            <Link as={RouterLink} to="/achievements">Achievements</Link>
            <Link as={RouterLink} to="/profile">Profile</Link>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}