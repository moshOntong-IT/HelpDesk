import React from "react";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import { Formik, Field } from "formik";
function TicketBox() {
  return (
    <Box flex="5" bg="whiteAlpha.200" borderTopLeftRadius="3xl" p="20px">
      <Flex w="full" h="full" flexDirection="column">
        <Box flex="1 0 auto" bg="red"></Box>

        <Flex flex="0 0 auto" minH="50px" py="10px">
          <Formik
            initialValues={{
              reply: "",
            }}
            onSubmit={onReply}
          >
            {({ handleSubmit, errors, touched, values }) => {
              return (
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <Flex justifyContent="space-between" w="full">
                    <FormControl isInvalid={!!errors.reply && touched.reply}>
                      <Field
                        as={Input}
                        id="reply"
                        name="reply"
                        type="text"
                        variant="filled"
                        placeholder="Your reply..."
                        autoComplete="off"
                        _focus={{
                          color: "white",
                          bg: "transparent",
                          borderColor: "blue.600",
                        }}
                        color="black"
                        required
                      />
                    </FormControl>

                    <IconButton
                      //   isLoading={mutateLoading}
                      aria-label="Call Segun"
                      size="md"
                      colorScheme="facebook"
                      disabled={values.reply.length < 3}
                      type="submit"
                      mx="3px"
                      icon={<IoIosSend />}
                    />
                  </Flex>
                </form>
              );
            }}
          </Formik>
        </Flex>
      </Flex>
    </Box>
  );
}

function onReply() {}
export default TicketBox;
