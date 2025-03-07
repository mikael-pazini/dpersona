export const formatCPF = (cpf: string): string => {
  if (!cpf) return "";

  // Remove qualquer caractere que não seja número
  const digits = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem exatamente 11 dígitos
  if (digits.length !== 11) {
    return "CPF inválido";
  }

  // Aplica a formatação correta: ###.###.###-##
  return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

export const visibleFormatCPF = (cpf: string): string => {
  if (!cpf) return "";

  // Remove qualquer caractere que não seja número
  const digits = cpf.replace(/\D/g, "");

  // Aplica a formatação correta: ###.###.###-##
  return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};
