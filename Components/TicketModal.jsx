import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Heading,
  Text,
  HStack,
  Flex,
  Box,
  Badge,
  Divider,
  Input,
  Skeleton,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import TimeDiff from "js-time-diff";
import { Formik, Field } from "formik";
import { useAuth } from "./AuthProvider";

function TicketModal({ isOpen, onClose, data }) {
  const { id, subject, ticketUuid, user, status, createdAt, description } =
    data;
  const { firstName, lastName, department } = user;
  const { userState } = useAuth();
  const queryClient = useQueryClient();
  // const { name: depName } = department;
  const messagesEndRef = useRef(null);
  const {
    data: commentsData,
    refetch,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useQuery(["ticketComments", id], getComments, {
    enabled: false,
  });

  const {
    isLoading: mutateLoading,
    isSuccess: mutateSuccess,
    error,
    mutateAsync,
  } = useMutation(createReply, {
    onSuccess: async () => {
      await queryClient.refetchQueries("ticketComments");
      await queryClient.invalidateQueries("tickets");
    },
  });
  const scrollToBottom = useMemo(() => {
    return () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  }, [mutateSuccess]);

  useEffect(() => {
    scrollToBottom();
  });
  useEffect(() => {
    if (isOpen) {
      refetch();
    } else {
      queryClient.resetQueries("ticketComments");
    }
  }, [isOpen]);

  async function createReply(value) {
    const [{ ticketId, userId }, data] = value;
    let { rst } = await axios.post(
      `${
        import.meta.env.VITE_API_URL
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
    const ticketId = id;

    const data = {
      ...values,
    };

    await mutateAsync([{ ticketId, userId }, data, resetForm]);
    resetForm();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="full">
              <Heading w="full" fontSize="1.5rem">
                {subject + " "}
                <Badge
                  colorScheme={
                    status === "Pending"
                      ? "orange"
                      : status === "Answered"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </Badge>
              </Heading>
              <HStack w="full" alignItems="baseline" justifyContent="">
                <Text as="strong" fontSize="1rem">
                  {firstName + " " + lastName}
                </Text>
                <Text as="strong" fontSize="0.8rem">
                  ({TimeDiff(createdAt)})
                </Text>
              </HStack>
              <Text fontSize="0.8rem" w="full">
                {ticketUuid}
              </Text>
              <Box w="full" rounded="md" p="10px">
                <Text>{description}</Text>
              </Box>
            </VStack>
          </ModalBody>
          <Divider />
          <ModalFooter flexDirection="column">
            <VStack
              h="20vh"
              w="full"
              mb="20px"
              overflow="auto"
              spacing="10px"
              display={
                !isLoading
                  ? commentsData && commentsData.length === 0
                    ? "none"
                    : "block"
                  : "block"
              }
            >
              {(isLoading || isFetching) && !mutateLoading && (
                <InitCommentSkeleton />
              )}
              {(isSuccess || mutateSuccess) &&
                commentsData.map((value, index) => {
                  return <CommentComponent comments={value} key={index} />;
                })}
              <div ref={messagesEndRef} />
            </VStack>
            {status === "Closed" && (
              <Text color="red.500">This ticket has already been closed.</Text>
            )}
            {status != "Closed" && (
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
                        <FormControl
                          isInvalid={!!errors.reply && touched.reply}
                        >
                          <Field
                            as={Input}
                            id="reply"
                            name="reply"
                            type="text"
                            variant="filled"
                            placeholder="Your reply..."
                            flex="3"
                            maxWidth="90%"
                            autoComplete="off"
                            required
                          />
                        </FormControl>

                        <Button
                          isLoading={mutateLoading}
                          disabled={values.reply.length < 3}
                          type="submit"
                          colorScheme="teal"
                          mr={3}
                        >
                          Reply
                        </Button>
                      </Flex>
                    </form>
                  );
                }}
              </Formik>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const CommentComponent = ({ comments }) => {
  const { user, createdAt, reply } = comments;
  const { firstName, lastName } = user;
  return (
    <>
      <Stack w="full" bgColor="gray.100" p="10px" spacing="10px" rounded="md">
        <VStack w="full" alignItems="baseline" spacing="0.5px">
          <Text as="strong" fontSize="1rem">
            {firstName + " " + lastName}
          </Text>
          <Text as="strong" fontSize="0.6rem" color="gray.400">
            {TimeDiff(createdAt)}
          </Text>
        </VStack>
        <Text w="full">{reply}</Text>
      </Stack>
    </>
  );
};

const InitCommentSkeleton = () => {
  return (
    <>
      <CommentSkeleton />
      <CommentSkeleton />
    </>
  );
};
const CommentSkeleton = () => {
  return (
    <Stack w="full" h="60px" bgColor="gray.100" p="10px" spacing="10px">
      <Skeleton height="20px" w="40%" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

async function getComments({ queryKey }) {
  const [_, id] = queryKey;
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/tickets/comments/${id}`
  );

  return data;
}
export default TicketModal;
