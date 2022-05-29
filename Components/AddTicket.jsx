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
  useToast,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { useAuth } from "./AuthProvider";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAddTicket } from "../utils/hooks/customHooks";
import api from "../src/api/appwrite";
function AddTicket({ isOpen, onClose }) {
  const { addTicket, isLoading } = useAddTicket();
  const toast = useToast();
  async function onSubmit(values) {
    const user = await api.getAccount();

    addTicket({ data: { user, ...values } })
      .then(() => {
        toast({
          title: "Ticket created.",
          status: "success",
          position: "bottom",
          duration: 5000,
          isClosable: true,
        });

        onClose();
      })
      .catch((e) => {
        toast({
          title: e.message,
          position: "bottom",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
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
                      colorScheme="facebook"
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
