import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';

interface OrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

const OrderConfirmedModal = ({ visible, onOk }: OrderConfirmedModalProps) => {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle />

        <StatusBar style="light" />

        <Text
          size={20}
          weight="600"
          color="#fff"
          style={{ marginTop: 12, marginBottom: 4 }}
        >
          Pedido confirmado
        </Text>

        <Text opacity={0.9} color="#fff">
          O pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onOk}>
          <Text color="#d73035" weight="600">
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
};

export default OrderConfirmedModal;
