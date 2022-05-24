import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
function DepartmentModal({ isOpen, onClose, data }) {
  const { name, description } = data;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="20px">{description}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DepartmentModal;
