// Definindo as interfaces

// Tipagem dos dados das transações
export interface Transacao {
    id: string;
    icone: 
      | "food" 
      | "car" 
      | "gamepad" 
      | "repeat" 
      | "wallet" 
      | "account" 
      | "home"        // Novo ícone para Casa
      | "hospital-building"  // Novo ícone para Saúde
      | "school"      // Novo ícone para Educação
      | "cake"        // Novo ícone para Lazer
      | "airplane"    // Novo ícone para Viagem
      | "package";    // Novo ícone para Outros
    titulo: string;
    data: string;
    valor: string;
    categoria: 
      | "Alimentação" 
      | "Transporte" 
      | "Entretenimento" 
      | "Casa"
      | "Saúde"       // Nova categoria para Saúde
      | "Educação"    // Nova categoria para Educação
      | "Lazer"       // Nova categoria para Lazer
      | "Viagem"      // Nova categoria para Viagem
      | "Outros";     // Nova categoria para Outros
    tipo: "entrada" | "saida";
  }
  
  // Tipagem para o componente de botão de filtro
  export interface BotaoFiltroProps {
    label: string;
    active: boolean;
    dark: any;
    onPress: () => void;
  }
  
  // Tipagem para o componente de cartão de transação
  export interface CartaoTransacaoProps {
    item: Transacao; // Utilizando a interface de transação definida
    corAtiva: string;
    escuro: boolean;
  }
  