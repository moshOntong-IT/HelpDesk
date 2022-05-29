import {
  Box,
  Center,
  Heading,
  Link,
  FormLabel,
  Input,
  VStack,
  FormControl,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "@fontsource/outfit";
import { Formik, Field } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/appwrite";
import useAccount from "../../utils/zustand/account";
import { useAuth } from "../../utils/hooks/customHooks";

function Login() {
  //create a uerAccount for this
  // const { userState, setUser, isUserAuthenticated } = useAuth();

  const account = useAccount((state) => state.account);
  const { isLoading, error, login } = useAuth();
  // const [invalidUser, setInvalidUser] = useState(false);
  // const [isLoading, setLoading] = useState(false);
  // const [errorCode, setErrorCode] = useState();
  const navigate = useNavigate();

  async function onSubmit(values) {
    const { account, password } = values;

    login(account, password);
    // try {
    //   setInvalidUser(false);
    //   setLoading(true);
    //   await api.createSession(account, password);
    //   const data = await api.getAccount();

    //   setAccount(data);
    // } catch (e) {
    //   console.log(e.message);
    //   setErrorCode(e.code);

    //   if (e.code == "401") {
    //     setInvalidUser(true);
    //   }
    // }

    // setLoading(false);
    // await refetch().then(({ data }) => {
    //   for (let user of data) {
    //     const {
    //       email: emailResult,
    //       password: passwordResult,
    //       username: usernameResult,
    //     } = user;

    //     if (
    //       (account === emailResult || account === usernameResult) &&
    //       password === passwordResult
    //     ) {
    //       setInvalidUser(false);

    //       setUser(user);
    //       navigate("/home");
    //       break;
    //     }
    //   }
    //   setInvalidUser(true);
    // });
  }
  if (account) {
    return <Navigate to="/home" replace />;
  }
  return (
    <Box
      h="100vh"
      bgGradient="linear-gradient(99.87deg, #E2FFE5 6.72%, rgba(255, 255, 255, 0) 99.63%)"
    >
      <Center h="full" w="full">
        <Box
          h="80%"
          w="30%"
          boxShadow="xl"
          bg="white"
          rounded="md"
          overflow="auto"
        >
          <VStack w="full" p="30px" spacing="50px">
            <VStack w="full">
              <Heading w="full" fontSize="1.5rem">
                Sign in
              </Heading>

              {/* <Link
                w="full"
                color="blue.400"
                onClick={() => {
                  navigate("/signUp");
                }}
              >
                I don't have an account
              </Link> */}

              {error != undefined && (
                <Alert status="error" flexDir="column" textAlign="center">
                  <AlertIcon />
                  <AlertTitle>{error.message}</AlertTitle>
                  <AlertDescription>{error.description}</AlertDescription>
                </Alert>
              )}
            </VStack>
            <Box w="full">
              <Formik
                initialValues={{
                  account: "",
                  password: "",
                }}
                onSubmit={onSubmit}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing="20px">
                      <FormControl>
                        <FormLabel htmlFor="account">Email Address</FormLabel>
                        <Field
                          as={Input}
                          id="account"
                          name="account"
                          type="email"
                          variant="filled"
                          required
                        />
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.password && touched.password}
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type="password"
                          variant="filled"
                          validate={(value) => {
                            let error;

                            if (value.length < 5) {
                              error =
                                "Password must contain at least 6 characters";
                            }

                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <Button
                        isLoading={isLoading}
                        type="submit"
                        colorScheme="facebook"
                        width="full"
                      >
                        Login
                      </Button>
                    </VStack>
                  </form>
                )}
              </Formik>
            </Box>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}

export default Login;
