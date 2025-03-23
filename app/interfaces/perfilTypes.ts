// Definindo a interface para os ícones
export interface Icons {
    account: string;
    settings: string;
    support: string;
    preferences: string;
    password: string;
    twoFactor: string;
    security: string;
    help: string;
    contact: string;
    info: string;
    display: string;
    profile: string;
    theme: string;
}

// Tipo para os dados passados para o ItemComIcone
export interface ItemComIconeProps {
    icone: keyof Icons;  // Usando a chave dos ícones para tipar
    texto: string;
    onPress: () => void;
}

// Tipagem para os dados do CartaoPerfil
export interface CartaoPerfilProps {
    nome: string;
    foto: string;
    dark: boolean;
}

// Tipagem para o estado e props do componente principal
export interface PerfilScreenProps {
    nome: string;
    foto: string;
    dark: boolean;
}