import React from 'react';
import {
  Box,
  Grid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Progress,
  SimpleGrid,
  Card,
  CardBody,
  Text,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { day: 'Mon', progress: 30 },
  { day: 'Tue', progress: 45 },
  { day: 'Wed', progress: 55 },
  { day: 'Thu', progress: 70 },
  { day: 'Fri', progress: 85 },
];

export default function Dashboard() {
  return (
    <Box p={8}>
      <Heading mb={6}>Welcome back!</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Stat>
          <StatLabel>Total Points</StatLabel>
          <StatNumber>1,245</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Courses Completed</StatLabel>
          <StatNumber>3</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Current Streak</StatLabel>
          <StatNumber>5 days</StatNumber>
        </Stat>
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Learning Progress</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#38B2AC" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Active Courses</Heading>
            {['Mathematics', 'Physics', 'Computer Science'].map((course) => (
              <Box key={course} mb={4}>
                <Text mb={2}>{course}</Text>
                <Progress value={Math.random() * 100} colorScheme="teal" />
              </Box>
            ))}
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
}