import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";

// Dados de transações
const transactionsData = [
  { id: "1", icon: "food", title: "Almoço", date: "15/03/2025", value: "R$ 25,00", category: "Alimentação" },
  { id: "2", icon: "car", title: "Gasolina", date: "16/03/2025", value: "R$ 50,00", category: "Transporte" },
  { id: "3", icon: "gamepad", title: "Jogo", date: "17/03/2025", value: "R$ 60,00", category: "Entretenimento" },
  { id: "4", icon: "repeat", title: "Luz", date: "18/03/2025", value: "R$ 100,00", category: "Casa" },
  { id: "5", icon: "wallet", title: "Água", date: "19/03/2025", value: "R$ 40,00", category: "Casa" },
  { id: "6", icon: "account", title: "Internet", date: "20/03/2025", value: "R$ 120,00", category: "Casa" },
  { id: "7", icon: "food", title: "Janta", date: "15/03/2025", value: "R$ 27,00", category: "Alimentação" },
];

// Ícones definidos
const icons = {
  food: "food",
  car: "car",
  gamepad: "gamepad",
  repeat: "repeat",
  wallet: "wallet",
  account: "account",
};

type MaterialIcons = keyof typeof icons;

const FilterButton = ({ label, active, onPress }: { label: string, active: boolean, onPress: () => void }) => {
  const { colors } = useTheme();
  const activeColor = "#EF6C04";
  const inactiveColor = "#626262";
  
  return (
    <TouchableOpacity style={styles.filter} onPress={onPress}>
      <Text style={{ color: active ? activeColor : inactiveColor }}>{label}</Text>
    </TouchableOpacity>
  );
};

const TransactionCard = ({ item, activeColor, dark }: { item: typeof transactionsData[0], activeColor: string, dark: boolean }) => {
  const { colors } = useTheme();

  // Certifique-se de que o ícone esteja tipado corretamente
  const iconName = item.icon as MaterialIcons;

  return (
    <View style={[styles.transactionCard, { backgroundColor: dark ? "#333" : "#fff" }]}>
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={activeColor}
        style={styles.icon}
      />
      <View style={styles.transactionDetails}>
        <Text style={[styles.transactionTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.transactionDate, { color: colors.text }]}>{item.date}</Text>
      </View>
      <Text style={[styles.transactionValue, { color: colors.text }]}>{item.value}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const { colors, dark } = useTheme();
  const availableMoney = 200;
  const spentThisWeek = 135;

  const [visibleItems, setVisibleItems] = useState(3); // Número de itens visíveis inicialmente
  const [showAll, setShowAll] = useState(false); // Controle do estado do botão
  const [selectedFilter, setSelectedFilter] = useState<string>("Todos"); // Filtro selecionado

  const backgroundColor = dark ? "#121212" : "#fff";
  const activeColor = "#EF6C04";

  const toggleVisibility = () => {
    setVisibleItems(showAll ? 3 : transactionsData.length); // Alterna entre "Ver mais" e "Ver menos"
    setShowAll(!showAll);
  };

  const filteredTransactions = transactionsData.filter(
    (item) => selectedFilter === "Todos" || item.category === selectedFilter
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Hi, kaliburiti</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>Bem-vindo de volta</Text>
      </View>

      {/* Cartão de Crédito */}

    <View style={[styles.card, { backgroundColor: dark ? `${activeColor}A1` : "#fff" }, { borderColor: dark ? activeColor : "#fff" }, { borderWidth: dark ? 1 : 0 }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Dinheiro Restante</Text>
        <Text style={[styles.cardValue, { color: colors.text }]}>
          R$ {availableMoney - spentThisWeek}
        </Text>
        <Text style={[styles.cardLabel, { color: colors.text }]}>Despesas desta semana</Text>
        <ProgressBar progressValue={50}/>
        <Text style={[styles.cardMessage, { color: colors.text }]}>
          Você gastou {spentThisWeek} até agora. Fique atento ao orçamento.
        </Text>
      </View>

      {/* Lista de Transações */}
      <View style={styles.transactionList}>
        <View style={styles.transactionListHeader}>
          <Text style={[styles.transactionListTitle, { color: colors.text }]}>Lista de Transações</Text>
          <TouchableOpacity onPress={toggleVisibility}>
            <Text style={[styles.viewMore, { color: activeColor }]}>
              {showAll ? "Ver menos" : "Ver mais"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filters}>
        {["Todos", "Alimentação", "Transporte", "Entretenimento", "Casa"].map((category) => (
          <FilterButton
            key={category}
            label={category}
            active={selectedFilter === category}
            onPress={() => setSelectedFilter(category)}
          />
        ))}
      </View>

      {/* Cards de Transações */}
      {filteredTransactions.slice(0, visibleItems).map((item) => (
        <TransactionCard key={item.id} item={item} activeColor={activeColor} dark={dark} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginTop: 50, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16 },
  card: { padding: 16, borderRadius: 8, marginBottom: 24 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardValue: { fontSize: 24, fontWeight: "bold", marginVertical: 8 },
  cardLabel: { fontSize: 14 },
  cardMessage: { fontSize: 14, marginTop: 8 },
  transactionList: { marginBottom: 16 },
  transactionListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionListTitle: { fontSize: 18, fontWeight: "bold" },
  viewMore: { fontSize: 14, textAlign: "right" },
  filters: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  filter: { fontSize: 14, marginBottom: 16 },
  transactionCard: { flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 8, marginBottom: 8 },
  icon: { fontSize: 24, marginRight: 16 },
  transactionDetails: { flex: 1 },
  transactionTitle: { fontSize: 16, fontWeight: "bold" },
  transactionDate: { fontSize: 12, color: "gray" },
  transactionValue: { fontSize: 16, fontWeight: "bold" },
});
