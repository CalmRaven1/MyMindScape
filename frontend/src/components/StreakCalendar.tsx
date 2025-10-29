import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

interface StreakDay {
  date: string;
  completed: boolean;
}

interface StreakCalendarProps {
  streak: StreakDay[];
  currentStreak: number;
}

export default function StreakCalendar({ streak, currentStreak }: StreakCalendarProps) {
  const activeBg = useColorModeValue('purple.500', 'purple.400');
  const inactiveBg = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={2} justify="center">
        {streak.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Box
              w="40px"
              h="40px"
              borderRadius="lg"
              bg={day.completed ? activeBg : inactiveBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              position="relative"
              _after={day.completed ? {
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                borderRadius: 'lg',
                border: '2px solid',
                borderColor: 'purple.300',
                animation: 'pulse 2s infinite'
              } : {}}
            >
              {new Date(day.date).getDate()}
            </Box>
          </motion.div>
        ))}
      </HStack>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Text
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          color={currentStreak >= 5 ? 'purple.500' : 'gray.600'}
        >
          {currentStreak} Day{currentStreak !== 1 ? 's' : ''} Streak!
          {currentStreak >= 5 && ' 🔥'}
        </Text>
      </motion.div>
    </VStack>
  );
}