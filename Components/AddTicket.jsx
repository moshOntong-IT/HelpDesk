import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Flex,
  Box,
  Badge,
  Divider,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useAuth } from "./AuthProvider";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
function AddTicket({ isOpen, onClose }) {
  const { userState } = useAuth();
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, error, mutate } = useMutation(createTicket, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("tickets");
      onClose();
    },
  });
  function onSubmit(values) {
    const { id } = userState;
    const created_at = Date.now();
    const update_at = Date.now();

    const value = {
      ...values,
      status: "Pending",
      created_at,
      update_at,
    };
    mutate([id, value]);
  }

  async function createTicket(value) {
    const [id, data] = value;
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/add/ticket?createdBy=${id}`,
      data,
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                subject: "",
                description: "",
              }}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing="20px">
                    <FormControl
                      isInvalid={!!errors.subject && touched.subject}
                    >
                      <FormLabel htmlFor="subject">Subject</FormLabel>
                      <Field
                        as={Input}
                        id="subject"
                        name="subject"
                        type="text"
                        variant="filled"
                        required
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.description && touched.description}
                    >
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Field
                        as={Textarea}
                        id="description"
                        name="description"
                        variant="filled"
                        required
                      />
                    </FormControl>
                    <Button
                      isLoading={isLoading}
                      disabled={!touched.subject}
                      type="submit"
                      colorScheme="teal"
                      width="full"
                    >
                      Submit
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTicket;
