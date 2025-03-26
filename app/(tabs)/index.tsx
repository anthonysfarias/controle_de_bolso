import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import {
  BotaoFiltroProps,
  CartaoTransacaoProps,
  Transacao,
} from "../interfaces/indexTypes";
import { LinearGradient } from "expo-linear-gradient";

// Dados de transações
const dadosTransacoes: Transacao[] = [
  {
    id: "1",
    icone: "food",
    titulo: "Almoço",
    data: "15/03/2025",
    valor: "-R$ 25,00",
    categoria: "Alimentação",
    tipo: "saida",
  },
  {
    id: "2",
    icone: "car",
    titulo: "Gasolina",
    data: "16/03/2025",
    valor: "R$ 50,00",
    categoria: "Transporte",
    tipo: "entrada",
  },
  {
    id: "3",
    icone: "gamepad",
    titulo: "Jogo",
    data: "17/03/2025",
    valor: "-R$ 60,00",
    categoria: "Entretenimento",
    tipo: "saida",
  },
  {
    id: "4",
    icone: "home",
    titulo: "Luz",
    data: "18/03/2025",
    valor: "R$ 100,00",
    categoria: "Casa",
    tipo: "entrada",
  },
  {
    id: "5",
    icone: "home",
    titulo: "Água",
    data: "19/03/2025",
    valor: "R$ 40,00",
    categoria: "Casa",
    tipo: "entrada",
  },
  {
    id: "6",
    icone: "account",
    titulo: "Internet",
    data: "20/03/2025",
    valor: "-R$ 120,00",
    categoria: "Casa",
    tipo: "saida",
  },
  {
    id: "7",
    icone: "food",
    titulo: "Janta",
    data: "15/03/2025",
    valor: "-R$ 27,00",
    categoria: "Alimentação",
    tipo: "saida",
  },
  {
    id: "8",
    icone: "hospital-building",
    titulo: "Consulta médica",
    data: "21/03/2025",
    valor: "-R$ 150,00",
    categoria: "Saúde",
    tipo: "saida",
  },
  {
    id: "9",
    icone: "school",
    titulo: "Matrícula escolar",
    data: "22/03/2025",
    valor: "-R$ 500,00",
    categoria: "Educação",
    tipo: "saida",
  },
  {
    id: "10",
    icone: "cake",
    titulo: "Festa de aniversário",
    data: "23/03/2025",
    valor: "-R$ 200,00",
    categoria: "Lazer",
    tipo: "saida",
  },
  {
    id: "11",
    icone: "airplane",
    titulo: "Passagem aérea",
    data: "24/03/2025",
    valor: "-R$ 1200,00",
    categoria: "Viagem",
    tipo: "saida",
  },
  {
    id: "12",
    icone: "package",
    titulo: "Compra online",
    data: "25/03/2025",
    valor: "-R$ 100,00",
    categoria: "Outros",
    tipo: "saida",
  },
];

// Componente do botão de filtro
const BotaoFiltro = ({ label, dark, active, onPress }: BotaoFiltroProps) => {
  const corAtiva = dark ? "#ADF534" : "#FC4145";
  const corInativa = dark ? "#A1A1A1" : "#626262";

  return (
    <TouchableOpacity style={estilos.filtro} onPress={onPress}>
      <Text style={{ color: active ? corAtiva : corInativa }}>{label}</Text>
    </TouchableOpacity>
  );
};

// Componente do cartão de transação
const CartaoTransacao = ({ item, corAtiva, escuro }: CartaoTransacaoProps) => {
  const { colors } = useTheme();

  // Usando diretamente o nome do ícone em vez de tentar acessar uma variável externa
  const nomeIcone = item.icone; // "food", "car", "gamepad", etc.

  // Verificando se é uma entrada ou saída e formatando a cor do valor
  const isEntrada = item.tipo === "entrada";
  const corValor = isEntrada ? "#28a745" : "#dc3545"; // verde para entrada, vermelho para saída

  return (
    <View
      style={[
        estilos.cartaoTransacao,
        { backgroundColor: escuro ? "#18181C" : "#c3c3c31A" },
      ]}
    >
      {/* Usando o nome do ícone diretamente */}
      <MaterialCommunityIcons
        name={nomeIcone} // "food", "car", etc.
        size={24}
        color={corAtiva}
        style={estilos.icone}
      />
      <View style={estilos.detalhesTransacao}>
        <Text style={[estilos.tituloTransacao, { color: colors.text }]}>
          {item.titulo}
        </Text>
        <Text style={[estilos.dataTransacao, { color: colors.text }]}>
          {item.data}
        </Text>
      </View>
      <Text style={[estilos.valorTransacao, { color: corValor }]}>
        {item.valor}
      </Text>
    </View>
  );
};

// Componente principal da tela
const TelaInicial: React.FC = () => {
  const { colors, dark } = useTheme();
  const dinheiroDisponivel = 200;
  const gastoEstaSemana = 135;

  const [itensVisiveis, setItensVisiveis] = useState<number>(3); // Tipagem para número de itens visíveis
  const [mostrarTodos, setMostrarTodos] = useState<boolean>(false); // Tipagem para controle do "Ver mais"
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("Todos"); // Tipagem para filtro de categoria

  const corDeFundo = dark ? "#000002" : "#fff";
  const corAtiva = dark ? "#ADF534" : "#FC4145";

  const alternarVisibilidade = () => {
    setItensVisiveis(mostrarTodos ? 3 : dadosTransacoes.length); // Alterna entre "Ver mais" e "Ver menos"
    setMostrarTodos(!mostrarTodos);
  };

  // Filtrando as transações com base no filtro selecionado
  const transacoesFiltradas: Transacao[] = dadosTransacoes.filter(
    (item) =>
      filtroSelecionado === "Todos" || item.categoria === filtroSelecionado
  );

  return (
    <ScrollView style={[estilos.container, { backgroundColor: corDeFundo }]}>
      {/* Cabeçalho */}
      <View style={estilos.cabecalho}>
        <Text style={[estilos.titulo, { color: colors.text }]}>
          Olá, kaliburiti
        </Text>
        <Text style={[estilos.subtitulo, { color: colors.text }]}>
          Bem-vindo de volta
        </Text>
      </View>

      {/* Cartão de Crédito */}
      <LinearGradient
      colors={dark ? ["#16A085", "#769A3F"] : ["#ffb88e", "#c11e38"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={estilos.cartao}
    >
        <Text style={[estilos.tituloCartao, { color: colors.text }]}>
          Dinheiro Restante
        </Text>
        <Text style={[estilos.valorCartao, { color: colors.text }]}>
          R$ {dinheiroDisponivel - gastoEstaSemana}
        </Text>
        <Text style={[estilos.rotuloCartao, { color: colors.text }]}>
          Despesas desta semana
        </Text>
        <ProgressBar progressValue={20} />
        <Text style={[estilos.mensagemCartao, { color: colors.text }]}>
          Você gastou {gastoEstaSemana} até agora. Fique atento ao orçamento.
        </Text>
      </LinearGradient>

      {/* Lista de Transações */}
      <View style={estilos.listaTransacoes}>
        <View style={estilos.cabecalhoListaTransacoes}>
          <Text style={[estilos.tituloListaTransacoes, { color: colors.text }]}>
            Lista de Transações
          </Text>
          <TouchableOpacity onPress={alternarVisibilidade}>
            <Text style={[estilos.verMais, { color: corAtiva }]}>
              {mostrarTodos ? "Ver menos" : "Ver mais"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={estilos.filtros}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {[
            "Todos",
            "Alimentação",
            "Transporte",
            "Entretenimento",
            "Casa",
            "Saúde",
            "Educação",
            "Lazer",
            "Viagem",
            "Outros",
          ].map((categoria) => (
            <BotaoFiltro
              key={categoria}
              label={categoria}
              dark={dark}
              active={filtroSelecionado === categoria}
              onPress={() => setFiltroSelecionado(categoria)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Cards de Transações */}
      {transacoesFiltradas.slice(0, itensVisiveis).map((item) => (
        <CartaoTransacao
          key={item.id}
          item={item}
          corAtiva={corAtiva}
          escuro={dark}
        />
      ))}
    </ScrollView>
  );
};

// Estilos do aplicativo
const estilos = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cabecalho: { marginTop: 50, marginBottom: 24 },
  titulo: { fontSize: 24, fontWeight: "bold" },
  subtitulo: { fontSize: 16 },
  cartao: { padding: 16, borderRadius: 8, marginBottom: 24 },
  tituloCartao: { fontSize: 18, fontWeight: "bold" },
  valorCartao: { fontSize: 24, fontWeight: "bold", marginVertical: 8 },
  rotuloCartao: { fontSize: 14 },
  mensagemCartao: { fontSize: 14, marginTop: 8 },
  listaTransacoes: { marginBottom: 16 },
  cabecalhoListaTransacoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tituloListaTransacoes: { fontSize: 18, fontWeight: "bold" },
  verMais: { fontSize: 14, textAlign: "right" },

  filtros: {
    flexDirection: "row",
    marginTop: 8,
    paddingHorizontal: 8, // Adicionando algum espaço nas laterais
  },
  filtro: {
    fontSize: 14,
    marginRight: 12, // Ajuste no espaçamento entre os filtros
    marginBottom: 16, // Espaçamento entre filtros e a próxima linha de conteúdo
  },
  cartaoTransacao: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  icone: { fontSize: 24, marginRight: 16 },
  detalhesTransacao: { flex: 1 },
  tituloTransacao: { fontSize: 16, fontWeight: "bold" },
  dataTransacao: { fontSize: 12, color: "gray" },
  valorTransacao: { fontSize: 16, fontWeight: "bold" },
});

export default TelaInicial;
