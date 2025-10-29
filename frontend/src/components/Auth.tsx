import React, { useState } from 'react';
import {
  Box,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Card,
  CardBody,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast({
        title: isLogin ? 'Login Successful' : 'Registration Successful',
        status: 'success',
        duration: 3000,
      });

      // Redirect to dashboard
      window.location.href = '/';
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box p={8} maxWidth="400px" mx="auto">
      <Card>
        <CardBody>
          <VStack spacing={6}>
            <Heading size="lg">{isLogin ? 'Login' : 'Register'}</Heading>
            
            <Tabs isFitted variant="soft-rounded" onChange={(index) => setIsLogin(index === 0)}>
              <TabList mb="1em">
                <Tab>Login</Tab>
                <Tab>Register</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </FormControl>
                      
                      <Button
                        type="submit"
                        colorScheme="teal"
                        width="full"
                        isLoading={loading}
                      >
                        Login
                      </Button>
                    </VStack>
                  </form>
                </TabPanel>
                
                <TabPanel>
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                      <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </FormControl>
                      
                      <Button
                        type="submit"
                        colorScheme="teal"
                        width="full"
                        isLoading={loading}
                      >
                        Register
                      </Button>
                    </VStack>
                  </form>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}