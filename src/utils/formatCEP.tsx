export const formatCEP = (cep: string): string => {
  if (!cep) return "";

  // Remove qualquer caractere que não seja número
  const digits = cep.replace(/\D/g, "");

  // Verifica se o CEP tem exatamente 8 dígitos
  if (digits.length !== 8) {
    return "CEP inválido";
  }

  // Aplica a formatação correta: #####-###
  return digits.replace(/^(\d{5})(\d{3})$/, "$1-$2");
};

export const visibleFormatCEP = (cep: string): string => {
  if (!cep) return "";

  // Remove qualquer caractere que não seja número
  const digits = cep.replace(/\D/g, "");

  // Aplica a formatação correta: #####-###
  return digits.replace(/^(\d{5})(\d{3})$/, "$1-$2");
};
