import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

const NovaTransacao = () => {
  const { colors, dark } = useTheme();
  const [valor, setValor] = useState("");
  const [nota, setNota] = useState("");
  const [data, setData] = useState(new Date()); // Estado para data
  const [mostrarData, setMostrarData] = useState(false); // Controle da visibilidade do DatePicker

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setData(currentDate);
    setMostrarData(false);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: dark ? "#18181C" : "#fff" }]}
    >
      <Text style={[styles.titulo, { color: colors.text }]}>Nova Transação</Text>
      
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: colors.text }]}>Despesas</Text>
        <Text style={[styles.switchText, { color: colors.text }]}>Receitas</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="$"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Nota"
          value={nota}
          onChangeText={setNota}
        />

        <TouchableOpacity
          onPress={() => setMostrarData(true)}
          style={styles.datePicker}
        >
          <Text style={{ color: colors.text }}>
            {data.toLocaleDateString()}
          </Text>
          <MaterialCommunityIcons name="calendar" size={24} color={colors.text} />
        </TouchableOpacity>

        {mostrarData && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.uploadButton}>
          <MaterialCommunityIcons name="camera" size={24} color={colors.text} />
          <Text style={{ color: colors.text }}>Upload mídia</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24, // Ajustado para espaçamento maior
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Alinhamento centralizado e espaçamento uniforme
    marginBottom: 24, // Ajustado para maior separação
  },
  switchText: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 24, // Maior espaçamento entre os inputs e o botão de data
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12, // Padding vertical ajustado para maior área clicável
    paddingHorizontal: 16, // Adicionado padding horizontal para melhor estética
    marginBottom: 16, // Maior separação entre inputs
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12, // Padding vertical ajustado
    paddingHorizontal: 16, // Padding horizontal ajustado
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16, // Aumentado o espaçamento entre o DatePicker e o próximo item
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12, // Padding vertical ajustado
    paddingHorizontal: 16, // Padding horizontal ajustado
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 16, // Ajustado para maior separação antes do botão de salvar
  },
  saveButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16, // Padding vertical aumentado para um botão mais largo
    paddingHorizontal: 32, // Padding horizontal aumentado
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NovaTransacao;
