import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaStar, FaTrophy, FaMedal } from 'react-icons/fa';

interface RewardPopupProps {
  reward: {
    type: 'points' | 'achievement' | 'level-up';
    title: string;
    description: string;
    value?: number;
  };
  onClose: () => void;
}

export default function RewardPopup({ reward, onClose }: RewardPopupProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (reward.type) {
      case 'points':
        return FaStar;
      case 'achievement':
        return FaTrophy;
      case 'level-up':
        return FaMedal;
    }
  };

  const getGradient = () => {
    switch (reward.type) {
      case 'points':
        return 'linear(to-r, yellow.400, orange.500)';
      case 'achievement':
        return 'linear(to-r, purple.400, pink.500)';
      case 'level-up':
        return 'linear(to-r, blue.400, teal.500)';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
        }}
      >
        <Box
          bgGradient={getGradient()}
          borderRadius="xl"
          p={4}
          boxShadow="xl"
          maxW="300px"
          color={textColor}
          position="relative"
          overflow="hidden"
        >
          {/* Background animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <VStack spacing={2} align="stretch">
            <HStack spacing={3}>
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: 1,
                }}
              >
                <Icon as={getIcon()} boxSize={6} />
              </motion.div>
              <Text fontWeight="bold" fontSize="lg">
                {reward.title}
              </Text>
            </HStack>

            <Text fontSize="sm">{reward.description}</Text>

            {reward.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  textAlign="center"
                  mt={2}
                >
                  +{reward.value}
                </Text>
              </motion.div>
            )}
          </VStack>

          {/* Confetti effect for achievements and level-ups */}
          {(reward.type === 'achievement' || reward.type === 'level-up') && (
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: 2,
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
          )}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}