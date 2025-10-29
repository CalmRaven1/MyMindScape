import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Text,
  VStack,
  keyframes,
  useColorModeValue,
} from '@chakra-ui/react';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

interface AchievementBadgeProps {
  name: string;
  icon: string;
  isNew?: boolean;
  level?: number;
}

export default function AchievementBadge({ name, icon, isNew, level }: AchievementBadgeProps) {
  const bgGradient = useColorModeValue(
    'linear(to-r, purple.400, blue.500)',
    'linear(to-r, purple.600, blue.700)'
  );
  const glowColor = useColorModeValue('purple.200', 'purple.400');
  
  const spinAnimation = `${spin} 20s linear infinite`;

  return (
    <motion.div
      initial={isNew ? { scale: 0 } : { scale: 1 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Box
        position="relative"
        width="100px"
        height="100px"
        borderRadius="full"
        bgGradient={bgGradient}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        boxShadow={isNew ? `0 0 20px ${glowColor}` : 'none'}
      >
        {/* Animated background effect */}
        <Box
          position="absolute"
          top="-50%"
          left="-50%"
          width="200%"
          height="200%"
          bgGradient="radial(circle, whiteAlpha.200 0%, transparent 70%)"
          animation={spinAnimation}
        />
        
        {/* Icon */}
        <Text fontSize="3xl">{icon}</Text>
        
        {/* Level indicator */}
        {level && (
          <Box
            position="absolute"
            bottom="0"
            right="0"
            bg="blackAlpha.700"
            color="white"
            borderRadius="full"
            width="24px"
            height="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            fontWeight="bold"
          >
            {level}
          </Box>
        )}
        
        {/* New badge */}
        {isNew && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Box
              position="absolute"
              top="-2"
              right="-2"
              bg="red.500"
              color="white"
              borderRadius="full"
              px={2}
              py={1}
              fontSize="xs"
              fontWeight="bold"
            >
              NEW!
            </Box>
          </motion.div>
        )}
      </Box>
      
      <Text
        mt={2}
        textAlign="center"
        fontWeight="bold"
        fontSize="sm"
        color={isNew ? 'purple.500' : 'gray.600'}
      >
        {name}
      </Text>
    </motion.div>
  );
}