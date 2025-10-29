import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Textarea,
  Button,
  useToast,
  Card,
  CardBody,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';

export default function StudyTools() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      
      toast({
        title: 'Summary Generated',
        description: data.summary,
        status: 'success',
        duration: null,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate summary',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleGenerateQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      
      // Display quiz in accordion
      toast({
        title: 'Quiz Generated',
        description: 'Quiz is ready below',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate quiz',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Heading>Study Tools</Heading>
        
        <Card>
          <CardBody>
            <Text mb={4}>Paste your study content here:</Text>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your text here..."
              size="lg"
              mb={4}
            />
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                colorScheme="teal"
                onClick={handleSummarize}
                isLoading={loading}
              >
                Generate Summary
              </Button>
              <Button
                colorScheme="purple"
                onClick={handleGenerateQuiz}
                isLoading={loading}
              >
                Generate Quiz
              </Button>
            </Stack>
          </CardBody>
        </Card>

        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Generated Quiz
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              {/* Quiz questions will be dynamically added here */}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
}