import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  ScaleFade,
  CloseButton,
  Box,
} from '@chakra-ui/react';

interface Achievement {
  name: string;
  description: string;
}

interface LevelUp {
  newLevel: number;
  pointsEarned: number;
}

interface NotificationProps {
  achievements?: Achievement[];
  levelUp?: LevelUp;
  points?: number;
  onClose: () => void;
}

export default function AchievementNotification({
  achievements,
  levelUp,
  points,
  onClose,
}: NotificationProps) {
  return (
    <Box
      position="fixed"
      bottom={4}
      right={4}
      zIndex={9999}
      maxWidth="sm"
    >
      <ScaleFade in={true}>
        <VStack spacing={3} align="stretch">
          {achievements?.map((achievement) => (
            <Alert
              key={achievement.name}
              status="success"
              variant="solid"
              borderRadius="md"
              pr={8}
            >
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>New Achievement: {achievement.name}</AlertTitle>
                <AlertDescription>{achievement.description}</AlertDescription>
              </Box>
              <CloseButton
                position="absolute"
                right={1}
                top={1}
                onClick={onClose}
              />
            </Alert>
          ))}

          {levelUp && (
            <Alert
              status="info"
              variant="solid"
              colorScheme="purple"
              borderRadius="md"
              pr={8}
            >
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Level Up!</AlertTitle>
                <AlertDescription>
                  You've reached level {levelUp.newLevel}!
                  Earned {levelUp.pointsEarned} points.
                </AlertDescription>
              </Box>
              <CloseButton
                position="absolute"
                right={1}
                top={1}
                onClick={onClose}
              />
            </Alert>
          )}

          {points && (
            <Alert
              status="info"
              variant="solid"
              colorScheme="blue"
              borderRadius="md"
              pr={8}
            >
              <AlertIcon />
              <Box flex="1">
                <AlertTitle>Points Earned!</AlertTitle>
                <AlertDescription>
                  You've earned {points} points!
                </AlertDescription>
              </Box>
              <CloseButton
                position="absolute"
                right={1}
                top={1}
                onClick={onClose}
              />
            </Alert>
          )}
        </VStack>
      </ScaleFade>
    </Box>
  );
}