import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function CarteiraTela() {
  const [activeCard, setActiveCard] = useState(0);
  const { dark, colors } = useTheme();

  const corAtiva = dark ? "#ADF534" : "#FC4145";
  const corInativa = dark ? "#A1A1A1" : "#626262";

  const cards = [
    { 
      id: '1', 
      name: 'Cartão de Crédito - Visa', 
      number: '**** **** **** 1234',
      bank: 'Banco do Brasil',
      balance: 'R$ 5.000,00',
      accountType: 'Crédito',
      holder: 'João da Silva',
      expiry: '12/26',
      brand: require('../../assets/images/Visa_Logo.png'),
      backgroundColor: '#1E3A8A',
    },
    { 
      id: '2', 
      name: 'Cartão de Débito - MasterCard', 
      number: '**** **** **** 5678',
      bank: 'Itaú',
      balance: 'R$ 2.450,00',
      accountType: 'Débito',
      holder: 'Maria Oliveira',
      expiry: '05/25',
      brand: require('../../assets/images/Mastercard-logo.png'),
      backgroundColor: '#B91C1C',
    },
    { 
      id: '3', 
      name: 'Cartão de Crédito - Elo', 
      number: '**** **** **** 9876',
      bank: 'Santander',
      balance: 'R$ 7.300,00',
      accountType: 'Crédito',
      holder: 'Carlos Souza',
      expiry: '08/27',
      brand: require('../../assets/images/Elo_logo.png'),
      backgroundColor: '#047857',
    },
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const cardWidth = width * 0.8;
    const index = Math.round(contentOffsetX / cardWidth);
    if (index !== activeCard) {
      setActiveCard(index);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <Text style={[styles.titulo, { color: colors.text }]}>
          Olá, kaliburiti
        </Text>
        <Text style={[styles.subtitulo, { color: colors.text }]}>
          Bem-vindo de volta
        </Text>
      </View>
      
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {cards.map((item) => (
          <View
            key={item.id}
            style={[styles.card, { backgroundColor: item.backgroundColor }]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.bankName}>{item.bank}</Text>
              <Image source={item.brand} style={styles.brandLogo} />
            </View>
            <Text style={styles.cardNumber}>{item.number}</Text>
            <View style={styles.cardDetails}>
              <Text style={styles.cardHolder}>{item.holder}</Text>
              <Text style={styles.expiryDate}>{item.expiry}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Informações adicionais abaixo */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Banco:</Text>
          <Text style={styles.infoText}>{cards[activeCard].bank}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Saldo Disponível:</Text>
          <Text style={styles.infoText}>{cards[activeCard].balance}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Tipo de Conta:</Text>
          <Text style={styles.infoText}>{cards[activeCard].accountType}</Text>
       </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,  // Isso é importante para garantir que o ScrollView ocupe todo o espaço disponível
  },
  scrollContent: {
    alignItems: 'center',  
    paddingBottom: 40,  // Pode ajudar a evitar problemas de altura quando o conteúdo está próximo ao fundo
  },
  cabecalho: { marginTop: 50, marginBottom: 24 },
  titulo: { fontSize: 24, fontWeight: "bold" },
  subtitulo: { fontSize: 16 },
  card: {
    marginTop: 30,
    height: 240,
    width: width * 0.85,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 28,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bankName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
  brandLogo: {
    width: 55,
    height: 30,
    resizeMode: 'contain',
  },
  cardNumber: {
    fontSize: 22,
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    marginVertical: 12,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolder: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  expiryDate: {
    fontSize: 14,
    color: '#fff',
  },
  infoContainer: {
    marginTop: 30,  
    padding: 20,
    width: width,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
});
