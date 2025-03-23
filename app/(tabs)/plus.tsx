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
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import NumberFormat from "react-number-format"; // Biblioteca para formatação de números

const NovaTransacao = () => {
  const { colors, dark } = useTheme();
  const [valor, setValor] = useState("");
  const [nota, setNota] = useState("");
  const [data, setData] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);

  const corAtiva = dark ? "#ADF534" : "#FC4145";
  const corInativa = dark ? "#A1A1A1" : "#626262";
  const corBorda = dark ? "#444" : "#ddd";

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || data;
    setData(currentDate);
    setMostrarData(false);
  };

  const formatarValor = (text) => {
    // Removendo qualquer caractere não numérico
    let valorFormatado = text.replace(/\D/g, "");

    // Adicionando ponto como separador de milhar e vírgula como separador decimal
    if (valorFormatado.length > 2) {
      valorFormatado = valorFormatado.replace(
        /(\d)(\d{2})$/,
        "$1,$2"
      );
    }

    if (valorFormatado.length > 6) {
      valorFormatado = valorFormatado.replace(
        /(\d)(\d{3})(\d{3})$/,
        "$1.$2,$3"
      );
    }

    if (valorFormatado.length > 9) {
      valorFormatado = valorFormatado.replace(
        /(\d)(\d{3})(\d{3})(\d{3})$/,
        "$1.$2.$3,$4"
      );
    }

    return valorFormatado;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: dark ? "#18181C" : "#fff" }]}
    >
      <View style={[styles.cabecalho]}>
        <Text style={[styles.titulo, { color: colors.text }]}>
          Nova Transação
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: colors.text }]}>
          Despesas
        </Text>
        <Text style={[styles.switchText, { color: colors.text }]}>
          Receitas
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {/* Campo Valor com formatação de moeda */}
        <View style={[styles.inputWrapper, { borderColor: corBorda }]}>
          <Text style={[styles.currencySymbol, { color: colors.text }]}>
            R$
          </Text>
          <TextInput
            style={[
              styles.inputCurrencySymbol,
              { color: colors.text, borderColor: corBorda },
            ]}
            placeholder="0,00"
            placeholderTextColor={corInativa}
            keyboardType="numeric"
            value={valor}
            onChangeText={(text) => setValor(formatarValor(text))}
            onBlur={() => setValor(formatarValor(valor))} // Formatar quando perder o foco
          />
        </View>

        <TextInput
          style={[styles.input, { color: colors.text, borderColor: corBorda }]}
          placeholder="Nota"
          placeholderTextColor={corInativa}
          value={nota}
          onChangeText={setNota}
        />

        <TouchableOpacity
          onPress={() => setMostrarData(true)}
          style={[styles.datePicker, { borderColor: corBorda }]}
        >
          <Text style={{ color: colors.text }}>
            {data.toLocaleDateString()}
          </Text>
          <MaterialCommunityIcons
            name="calendar"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        {mostrarData && (
          <DateTimePicker
            value={data}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity
          style={[styles.uploadButton, { borderColor: corBorda }]}
        >
          <MaterialCommunityIcons name="camera" size={24} color={colors.text} />
          <Text style={{ color: colors.text }}>Upload mídia</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: dark ? `${corAtiva}A1` : `${corAtiva}66` },
          { borderColor: dark ? corAtiva : corAtiva },
          { borderWidth: 1 },
        ]}
      >
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
  cabecalho: {
    marginTop: 50,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 24,
  },
  switchText: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  currencySymbol: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputCurrencySymbol: {
    fontWeight: "bold",
    paddingLeft: 15,
    fontSize: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 16,
  },
  saveButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NovaTransacao;
