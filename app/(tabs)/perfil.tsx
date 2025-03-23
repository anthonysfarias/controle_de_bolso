import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CartaoPerfilProps, Icons, ItemComIconeProps } from "../interfaces/perfilTypes";

const icones: Icons = {
  account: "account",
  settings: "cog",
  support: "lifebuoy",
  preferences: "tune",
  password: "lock-reset",
  twoFactor: "shield-lock",
  security: "shield-check",
  help: "help-circle",
  contact: "message-text",
  info: "information",
  display: "monitor",
  profile: "account-cog",
  theme: "palette",
};

const ItemComIcone = ({
  icone,
  texto,
  onPress,
}: ItemComIconeProps) => {
  const { colors } = useTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      style={estilos.item}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={0.6}
    >
      <MaterialCommunityIcons
        name={icones[icone] as keyof typeof MaterialCommunityIcons.glyphMap}
        size={24}
        color={colors.text}
        style={estilos.iconeItem}
      />
      <Text
        style={[
          estilos.textoItem,
          { color: colors.text, opacity: pressed ? 0.6 : 1 },
        ]}
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
};

const CartaoPerfil = ({
  nome,
  foto,
  dark,
}: CartaoPerfilProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        estilos.cartao,
        { backgroundColor: dark ? "#18181C" : "#fff" },
      ]}
    >
      <Image source={{ uri: foto }} style={estilos.avatar} />
      <View style={estilos.detalhesPerfil}>
        <Text style={[estilos.nomePerfil, { color: colors.text }]}>{nome}</Text>
        <TouchableOpacity onPress={() => alert("Editando perfil")}> 
          <Text style={[estilos.editarPerfil, { color: dark ? "#ADF534" : "#FC4145" }]}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PerfilScreen = () => {
  const { colors, dark } = useTheme();

  return (
    <ScrollView
      style={[estilos.container, { backgroundColor: dark ? "#18181C" : "#fff" }]}
    >
      <View style={estilos.cabecalho}>
        <Text style={[estilos.titulo, { color: colors.text }]}>Perfil</Text>
      </View>

      <CartaoPerfil
        nome="Kalinne Frutinha"
        foto="https://1mphoto.com/wp-content/uploads/2024/05/fotos-de-perfil-anime-manga-dark-new.jpg"
        dark={dark}
      />

      <View style={estilos.secao}>
        <Text style={[estilos.subtitulo, { color: colors.text }]}>Preferências</Text>
        <ItemComIcone icone="display" texto="Alterar suas preferências de exibição" onPress={() => alert("Alterando preferências")} />
        <ItemComIcone icone="profile" texto="Personalizar seu perfil" onPress={() => alert("Personalizando perfil")} />
        <ItemComIcone icone="theme" texto="Configurar temas e aparência" onPress={() => alert("Configurando tema")} />
      </View>

      <View style={estilos.secao}>
        <Text style={[estilos.subtitulo, { color: colors.text }]}>Suporte</Text>
        <ItemComIcone icone="help" texto="Consultar nossa central de ajuda" onPress={() => alert("Consultando ajuda")} />
        <ItemComIcone icone="contact" texto="Falar com o suporte técnico" onPress={() => alert("Fazendo contato com o suporte")} />
        <ItemComIcone icone="info" texto="Informações sobre como usar o app" onPress={() => alert("Acessando informações")} />
      </View>

      <View style={estilos.secao}>
        <Text style={[estilos.subtitulo, { color: colors.text }]}>Configurações</Text>
        <ItemComIcone icone="password" texto="Alterar sua senha" onPress={() => alert("Alterando senha")} />
        <ItemComIcone icone="twoFactor" texto="Ativar a autenticação de dois fatores" onPress={() => alert("Ativando autenticação")} />
        <ItemComIcone icone="security" texto="Gerenciar suas preferências de segurança" onPress={() => alert("Gerenciando preferências")} />
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingVertical: 20 },
  cabecalho: { marginTop: 40, marginBottom: 24 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 25,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 24,
  },
  detalhesPerfil: { flex: 1 },
  nomePerfil: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  editarPerfil: { fontSize: 16, color: "#007BFF", marginTop: 4, textDecorationLine: "underline" },
  secao: { marginTop: 30 },
  subtitulo: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  iconeItem: { marginRight: 12 },
  textoItem: { fontSize: 16, flex: 1 },
});

export default PerfilScreen;
