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
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

function DepartmentForm({
  isOpen,
  onClose,
  data = { id: "", name: "", description: "" },
}) {
  const { id, name, description } = data;
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(createDepartment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("departments");
      onClose();
    },
  });
  const { isLoading: updateIsLoading, mutateAsync: updateMutateAsync } =
    useMutation(updateDepartment, {
      onSuccess: async () => {
        await queryClient.invalidateQueries("departments");
        onClose();
      },
    });
  async function onSubmit(values) {
    const value = {
      ...values,
    };
    if (name.length > 1 && description.length > 1) {
      await updateMutateAsync([id, { value }]);
    } else {
      await mutateAsync({ value });
    }
  }

  async function createDepartment(data) {
    const { value } = data;
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/add/department`,
      value,
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );
  }
  async function updateDepartment(data) {
    const [id, { value }] = data;
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/update/department/${id}`,
      value,
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
          <ModalHeader>Add Department</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                name: name,
                description: description,
              }}
              onSubmit={onSubmit}
            >
              {({ handleSubmit, errors, touched, values }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing="20px">
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Department Name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
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
                      isLoading={isLoading || updateIsLoading}
                      disabled={
                        values.name.length < 1 ||
                        (values.name.length > 1 &&
                          name === values.name &&
                          description === values.description)
                      }
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
export default DepartmentForm;
