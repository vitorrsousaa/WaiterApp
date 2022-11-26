import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/Cart';
import { Product } from '../../types/Product';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import OrderConfirmedModal from '../OrderConfirmedModal';
import { Text } from '../Text';
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmedOrder: () => void;
  selectedTable: string;
}

const Cart = ({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmedOrder,
  selectedTable,
}: CartProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const total = cartItems
    .reduce((acc, cartItem) => {
      return acc + cartItem.quantity * parseFloat(cartItem.product.price);
    }, 0)
    .toString();

  async function handleConfirmedOrder() {
    setIsloading(true);
    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    };

    await api.post('/orders', payload);
    setIsloading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmedOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal visible={isModalVisible} onOk={handleOk} />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          style={{ marginBottom: 20, maxHeight: 150 }}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.101:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                  <ProductDetails>
                    <Text size={14} weight="600">
                      {cartItem.product.name}
                    </Text>
                    <Text size={14} color="#666" style={{ marginTop: 4 }}>
                      {formatCurrency(cartItem.product.price)}
                    </Text>
                  </ProductDetails>
                </QuantityContainer>
              </ProductContainer>
              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text size={16} color="#999">
              Seu carrinho esta vazio
            </Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmedOrder}
          disabled={cartItems.length === 0}
          loading={isloading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
};

export default Cart;
