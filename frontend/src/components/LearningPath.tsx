import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Progress,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Button,
  Icon,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  useToast,
} from '@chakra-ui/react';
import { FaTrophy, FaStar, FaChartLine } from 'react-icons/fa';

interface LevelInfo {
  level: number;
  points: number;
  progress: number;
  next_level: number;
  points_needed: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  reward_points: number;
  progress: number;
}

interface Achievement {
  name: string;
  description: string;
  earned_at: string;
}

interface LearningPathData {
  level_info: LevelInfo;
  challenges: Challenge[];
  achievements: Achievement[];
}

export default function LearningPath() {
  const [data, setData] = useState<LearningPathData | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchLearningPath = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/learning-path', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch learning path');
        }

        const pathData = await response.json();
        setData(pathData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load learning path',
          status: 'error',
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [toast]);

  if (loading) {
    return <Box p={8}>Loading...</Box>;
  }

  if (!data) {
    return <Box p={8}>Failed to load learning path</Box>;
  }

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        {/* Level Progress */}
        <Card>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" align="center">
                <Heading size="md">Level {data.level_info.level}</Heading>
                <Badge colorScheme="purple" fontSize="md" p={2} borderRadius="md">
                  {data.level_info.points} Points
                </Badge>
              </Flex>
              
              <Box position="relative" pt={4}>
                <Progress
                  value={data.level_info.progress}
                  size="lg"
                  colorScheme="teal"
                  borderRadius="md"
                />
                <Text mt={2} fontSize="sm" color="gray.600">
                  {data.level_info.points_needed} points to level {data.level_info.next_level}
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Active Challenges */}
        <Box>
          <Heading size="md" mb={4}>Active Challenges</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {data.challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Flex justify="space-between">
                      <Heading size="sm">{challenge.title}</Heading>
                      <Icon as={FaStar} color="yellow.400" />
                    </Flex>
                    
                    <Text fontSize="sm">{challenge.description}</Text>
                    
                    <CircularProgress
                      value={challenge.progress}
                      color="teal.400"
                      size="100px"
                      alignSelf="center"
                    >
                      <CircularProgressLabel>{`${Math.round(challenge.progress)}%`}</CircularProgressLabel>
                    </CircularProgress>
                    
                    <Badge colorScheme="orange">
                      Reward: {challenge.reward_points} points
                    </Badge>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Recent Achievements */}
        <Box>
          <Heading size="md" mb={4}>Recent Achievements</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {data.achievements.slice(0, 6).map((achievement) => (
              <Card key={achievement.name}>
                <CardBody>
                  <VStack spacing={3} align="stretch">
                    <Flex align="center">
                      <Icon as={FaTrophy} color="yellow.400" mr={2} />
                      <Heading size="sm">{achievement.name}</Heading>
                    </Flex>
                    <Text fontSize="sm">{achievement.description}</Text>
                    <Text fontSize="xs" color="gray.500">
                      Earned: {new Date(achievement.earned_at).toLocaleDateString()}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Progress Stats */}
        <Card>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">Your Learning Journey</Heading>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
                <Stat
                  icon={FaChartLine}
                  label="Current Level"
                  value={data.level_info.level}
                />
                <Stat
                  icon={FaStar}
                  label="Total Points"
                  value={data.level_info.points}
                />
                <Stat
                  icon={FaTrophy}
                  label="Achievements"
                  value={data.achievements.length}
                />
                <Stat
                  icon={FaChartLine}
                  label="Active Challenges"
                  value={data.challenges.length}
                />
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

interface StatProps {
  icon: any;
  label: string;
  value: number;
}

function Stat({ icon, label, value }: StatProps) {
  return (
    <VStack spacing={2} align="center">
      <Icon as={icon} boxSize={6} color="teal.500" />
      <Text fontSize="sm" color="gray.500">{label}</Text>
      <Text fontSize="xl" fontWeight="bold">{value}</Text>
    </VStack>
  );
}