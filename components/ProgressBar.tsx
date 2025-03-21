import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ProgressBar = ({ progressValue }) => {
  const { colors } = useTheme();
  const [progress, setProgress] = useState(new Animated.Value(0)); // Valor da animação
  const [progressText, setProgressText] = useState(0); // Texto para mostrar o progresso

  useEffect(() => {
    // Iniciar a animação
    Animated.timing(progress, {
      toValue: progressValue, // Valor final da animação (100%)
      duration: 2000, // Duração da animação
      useNativeDriver: false, // Desabilitado porque estamos animando a largura da barra
    }).start();

    // Listener para capturar mudanças no valor da animação
    const id = progress.addListener(({ value }) => {
      setProgressText(Math.round(value)); // Atualiza o progresso com o valor arredondado
    });

    // Limpar o listener ao desmontar o componente
    return () => {
      progress.removeListener(id);
    };
  }, []); // UseEffect será executado uma vez após o primeiro render

  // Interpolação para a cor da barra (verde, amarelo, vermelho)
  const colorInterpolation = progress.interpolate({
    inputRange: [0, 50, 100], // Mudança de cor nos valores de 0%, 50% e 100%
    outputRange: ['green', 'yellow', 'red'], // Cores correspondentes
    extrapolate: 'clamp', // Evita extrapolar além do intervalo de 0 a 100
  });

  // Interpolação para o valor da largura da barra (0 a 100%)
  const widthInterpolation = progress.interpolate({
    inputRange: [0, 100], // Variando entre 0% e 100%
    outputRange: ['0%', '100%'], // Largura vai de 0% a 100%
    extrapolate: 'clamp', // Evita extrapolar além do intervalo
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bar, { width: widthInterpolation, backgroundColor: colorInterpolation }]}
      />
      {/* Texto da barra de progresso */}
      <Text style={[styles.text, { color: colors.text }]}>{`${progressText}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 16,
    justifyContent: 'center', // Alinha o texto verticalmente no centro da barra
  },
  bar: {
    height: 15,
    borderRadius: 10,
  },
  text: {
    position: 'absolute', // Posiciona o texto sobre a barra de progresso
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default ProgressBar;
