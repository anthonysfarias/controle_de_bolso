import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native";

const NovaTransacao = () => {
  const { colors, dark } = useTheme();
  const [valor, setValor] = useState("");
  const [nota, setNota] = useState("");
  const [data, setData] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [categoriaDespesa, setCategoriaDespesa] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [localDespesa, setLocalDespesa] = useState("");
  const [tipoTransacao, setTipoTransacao] = useState("despesa");
  const [localAtivo, setLocalAtivo] = useState(false);

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

  // Função para formatar valor com R$ e ponto para milhar, vírgula para centavos
  const formatarValor = (text: string) => {
    let valorNumerico = text.replace(/\D/g, "");

    if (!valorNumerico) {
      return "";
    }

    if (valorNumerico.length > 10) {
      valorNumerico = valorNumerico.slice(0, 10);
    }

    let valorFormatado = Number(valorNumerico) / 100;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(valorFormatado)
      .replace("R$", "")
      .trim();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: dark ? "#18181C" : "#fff" }]}
      contentContainerStyle={{ paddingBottom: 50 }} // Garante que haja espaçamento no fundo
    >
      <View style={[styles.cabecalho]}>
        <Text style={[styles.titulo, { color: colors.text }]}>
          Nova Transação
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <TouchableOpacity onPress={() => setTipoTransacao("despesa")}>
          <Text
            style={[
              styles.switchText,
              { color: tipoTransacao === "despesa" ? corAtiva : colors.text },
              {
                borderColor:
                  tipoTransacao === "despesa" ? corAtiva : corInativa,
                borderWidth: 1,
              },
            ]}
          >
            Despesas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTipoTransacao("receita")}>
          <Text
            style={[
              styles.switchText,
              { color: tipoTransacao === "receita" ? corAtiva : colors.text },
              {
                borderColor:
                  tipoTransacao === "receita" ? corAtiva : corInativa,
                borderWidth: 1,
              },
            ]}
          >
            Receitas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        {/* Se for Despesa */}
        {tipoTransacao === "despesa" && (
          <>
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Despesa
            </Text>
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
                onBlur={() => setValor(formatarValor(valor))}
              />
            </View>

            {/* Categoria de Despesa */}
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Categoria de Despesa
            </Text>
            <View style={[styles.inputWrapper, { borderColor: corBorda }]}>
              <Picker
                selectedValue={categoriaDespesa}
                onValueChange={(itemValue: string) =>
                  setCategoriaDespesa(itemValue)
                }
                style={[styles.picker, { color: colors.text }]}
                dropdownIconColor={colors.text}
              >
                <Picker.Item label="Selecione a categoria" value="" />
                <Picker.Item label="Alimentação" value="alimentacao" />
                <Picker.Item label="Moradia" value="moradia" />
                <Picker.Item label="Transporte" value="transporte" />
                <Picker.Item label="Saúde" value="saude" />
                <Picker.Item label="Lazer" value="lazer" />
                <Picker.Item label="Educação" value="educacao" />
                <Picker.Item label="Outros" value="outros" />
              </Picker>
            </View>

            {/* Método de Pagamento */}
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Método de Pagamento
            </Text>
            <View style={[styles.inputWrapper, { borderColor: corBorda }]}>
              <Picker
                selectedValue={metodoPagamento}
                onValueChange={(itemValue: string) =>
                  setMetodoPagamento(itemValue)
                }
                style={[styles.picker, { color: colors.text }]}
                dropdownIconColor={colors.text}
              >
                <Picker.Item label="Selecione o método de pagamento" value="" />
                <Picker.Item label="Cartão de Crédito" value="credito" />
                <Picker.Item label="Cartão de Débito" value="debito" />
                <Picker.Item label="Transferência" value="transferencia" />
                <Picker.Item label="Dinheiro" value="dinheiro" />
                <Picker.Item label="Cheque" value="cheque" />
              </Picker>
            </View>

            {/* Parcelamento */}
            {metodoPagamento === "credito" && (
              <>
                <Text style={[styles.inputLabel, { color: colors.text }]}>
                  Parcelas
                </Text>
                <View style={[styles.inputWrapper, { borderColor: corBorda }]}>
                  <Picker
                    selectedValue={parcelas}
                    onValueChange={(itemValue: string) =>
                      setParcelas(itemValue)
                    }
                    style={[styles.picker, { color: colors.text }]}
                    dropdownIconColor={colors.text}
                  >
                    <Picker.Item
                      label="Selecione o número de parcelas"
                      value=""
                    />
                    {/* Gerar as opções de 1 a 240 */}
                    {Array.from({ length: 240 }, (_, index) => (
                      <Picker.Item
                        key={index + 1}
                        label={`x${index + 1}`}
                        value={`${index + 1}`}
                      />
                    ))}
                  </Picker>
                </View>
              </>
            )}

            {/* Local da Despesa */}
            <View style={styles.localDespesaContainer}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Local ou Estabelecimento
              </Text>
              <Switch
                value={localAtivo}
                onValueChange={setLocalAtivo}
                trackColor={{ false: corInativa, true: corAtiva }}
                thumbColor={localAtivo ? corAtiva : corInativa}
              />
            </View>
            {localAtivo && (
              <TextInput
                style={[
                  styles.input,
                  { color: colors.text, borderColor: corBorda },
                ]}
                placeholder="Onde foi realizada?"
                placeholderTextColor={corInativa}
                value={localDespesa}
                onChangeText={setLocalDespesa}
              />
            )}
          </>
        )}

        {/* Se for Receita */}
        {tipoTransacao === "receita" && (
          <>
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Receita
            </Text>
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
                onBlur={() => setValor(formatarValor(valor))}
              />
            </View>

            {/* Categoria de Receita */}
            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Categoria de Receita
            </Text>
            <View style={[styles.inputWrapper, { borderColor: corBorda }]}>
              <Picker
                selectedValue={categoriaDespesa}
                onValueChange={(itemValue: string) =>
                  setCategoriaDespesa(itemValue)
                }
                style={[styles.picker, { color: colors.text }]}
                dropdownIconColor={colors.text}
              >
                <Picker.Item label="Selecione a categoria" value="" />
                <Picker.Item label="Salário" value="salario" />
                <Picker.Item label="Investimentos" value="investimentos" />
                <Picker.Item label="Outros" value="outros" />
              </Picker>
            </View>
          </>
        )}

        {/* Nota */}
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: corBorda }]}
          placeholder="Nota"
          placeholderTextColor={corInativa}
          value={nota}
          onChangeText={setNota}
        />

        {/* Data de Transação */}
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
    </ScrollView>
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
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
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
  },
  inputCurrencySymbol: {
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
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
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
  picker: {
    height: 50,
    width: "100%",
  },
  saveButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  localDespesaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default NovaTransacao;
