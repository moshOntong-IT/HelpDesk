import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Text,
  Center,
} from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import { Formik, Field } from "formik";
import { useMutation } from "react-query";
import { useAuth } from "../../../Components/AuthProvider";
import { useTickets } from "../Context/TicketContext";

import axios from "axios";
function TicketReplyForm() {
  const {
    isLoading: mutateLoading,
    isSuccess: mutateSuccess,
    error,
    mutateAsync,
  } = useMutation(createReply);

  async function createReply(value) {
    const [{ ticketId, userId }, data] = value;

    let { rst } = await axios.post(
      `${
        import.meta.env.VITE_API_SOCKET_URL
      }/api/add/ticket/comment?ticketId=${ticketId}&createdBy=${userId}`,
      data,
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );
    return rst;
  }
  async function onReply(values, { resetForm }) {
    const { id: userId } = userState;
    // console.log(userState);
    const ticketId = selectedTicket.id;

    const data = {
      ...values,
    };

    await mutateAsync([{ ticketId, userId }, data, resetForm]);
    resetForm();
  }

  return (
    <Flex flex="0 0 auto" minH="50px" py="10px">
      {selectedTicket.status === "Closed" && (
        <Center flexGrow="1">
          <Text color="red.500">This ticket has already been closed.</Text>
        </Center>
      )}
      {selectedTicket.status != "Closed" && (
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
                    isLoading={mutateLoading}
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
      )}
    </Flex>
  );
}

export default TicketReplyForm;
