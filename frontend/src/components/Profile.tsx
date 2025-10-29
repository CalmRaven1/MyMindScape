import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  Avatar,
  Badge,
  Progress,
  Divider,
  useToast,
} from '@chakra-ui/react';

interface UserProfile {
  user: {
    id: number;
    username: string;
    email: string;
    created_at: string;
  };
  achievements: {
    name: string;
    description: string;
    earned_at: string;
  }[];
  progress: {
    course: {
      id: number;
      title: string;
      difficulty: string;
    };
    completion: number;
    points: number;
    last_activity: string;
  }[];
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load profile',
          status: 'error',
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  if (loading) {
    return <Box p={8}>Loading...</Box>;
  }

  if (!profile) {
    return <Box p={8}>Failed to load profile</Box>;
  }

  const totalPoints = profile.progress.reduce((sum, p) => sum + p.points, 0);
  const completedCourses = profile.progress.filter(p => p.completion === 100).length;

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Card>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Avatar size="2xl" name={profile.user.username} />
              <Heading size="lg">{profile.user.username}</Heading>
              <Text color="gray.500">{profile.user.email}</Text>
              <Text fontSize="sm">
                Member since {new Date(profile.user.created_at).toLocaleDateString()}
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Stat>
            <StatLabel>Total Points</StatLabel>
            <StatNumber>{totalPoints}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Courses Completed</StatLabel>
            <StatNumber>{completedCourses}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Achievements</StatLabel>
            <StatNumber>{profile.achievements.length}</StatNumber>
          </Stat>
        </SimpleGrid>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Course Progress</Heading>
            <VStack spacing={4} align="stretch">
              {profile.progress.map((p) => (
                <Box key={p.course.id}>
                  <Text mb={2}>
                    {p.course.title}
                    <Badge ml={2} colorScheme={getDifficultyColor(p.course.difficulty)}>
                      {p.course.difficulty}
                    </Badge>
                  </Text>
                  <Progress value={p.completion} colorScheme="teal" />
                  <Text fontSize="sm" color="gray.500">
                    Last activity: {new Date(p.last_activity).toLocaleDateString()}
                  </Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Achievements</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {profile.achievements.map((achievement) => (
                <Card key={achievement.name} variant="outline">
                  <CardBody>
                    <VStack align="stretch" spacing={2}>
                      <Text fontWeight="bold">{achievement.name}</Text>
                      <Text fontSize="sm">{achievement.description}</Text>
                      <Text fontSize="xs" color="gray.500">
                        Earned: {new Date(achievement.earned_at).toLocaleDateString()}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'green';
    case 'intermediate':
      return 'blue';
    case 'advanced':
      return 'purple';
    default:
      return 'gray';
  }
}