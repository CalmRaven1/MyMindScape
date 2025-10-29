import React from 'react';
import {
  Box,
  SimpleGrid,
  Badge,
  Text,
  VStack,
  Heading,
  Progress,
  Card,
  CardBody,
  Image,
} from '@chakra-ui/react';

const achievements = [
  {
    title: 'Quick Learner',
    description: 'Complete your first course',
    progress: 100,
    earned: true,
    icon: '🎓',
  },
  {
    title: 'Study Streak',
    description: 'Study for 7 consecutive days',
    progress: 71,
    earned: false,
    icon: '🔥',
  },
  {
    title: 'Quiz Master',
    description: 'Score 100% on 5 quizzes',
    progress: 60,
    earned: false,
    icon: '🎯',
  },
  {
    title: 'Knowledge Explorer',
    description: 'Try all study tools',
    progress: 75,
    earned: false,
    icon: '🔍',
  },
  {
    title: 'Math Wizard',
    description: 'Complete advanced math course',
    progress: 30,
    earned: false,
    icon: '🧙‍♂️',
  },
  {
    title: 'Science Expert',
    description: 'Use Wolfram tool 50 times',
    progress: 45,
    earned: false,
    icon: '🔬',
  },
];

export default function Achievements() {
  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Achievements</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {achievements.map((achievement) => (
            <Card key={achievement.title}>
              <CardBody>
                <VStack spacing={3} align="stretch">
                  <Text fontSize="3xl">{achievement.icon}</Text>
                  <Box>
                    <Text fontWeight="bold">{achievement.title}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {achievement.description}
                    </Text>
                  </Box>
                  <Progress
                    value={achievement.progress}
                    colorScheme={achievement.earned ? 'green' : 'blue'}
                  />
                  <Badge colorScheme={achievement.earned ? 'green' : 'gray'}>
                    {achievement.earned ? 'Earned' : `${achievement.progress}% Progress`}
                  </Badge>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}