export const formatRG = (rg: string): string => {
  if (!rg) return "";

  // Remove qualquer caractere que não seja número
  const digits = rg.replace(/\D/g, "");

  // Verifica se o RG tem pelo menos 7 e no máximo 9 dígitos
  if (digits.length < 7 || digits.length > 9) {
    return "RG inválido";
  }

  // Formatação para diferentes tamanhos de RG
  if (digits.length === 9) {
    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d)$/, "$1.$2.$3-$4");
  } else if (digits.length === 8) {
    return digits.replace(/^(\d{1})(\d{3})(\d{3})(\d)$/, "$1.$2.$3-$4");
  } else {
    return digits.replace(/^(\d{3})(\d{3})(\d)$/, "$1.$2-$3");
  }
};

export const visibleFormatRG = (rg: string): string => {
  if (!rg) return "";

  // Remove qualquer caractere que não seja número
  const digits = rg.replace(/\D/g, "");

  // Formatação para diferentes tamanhos de RG
  if (digits.length === 9) {
    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d)$/, "$1.$2.$3-$4");
  } else if (digits.length === 8) {
    return digits.replace(/^(\d{1})(\d{3})(\d{3})(\d)$/, "$1.$2.$3-$4");
  } else {
    return digits.replace(/^(\d{3})(\d{3})(\d)$/, "$1.$2-$3");
  }
};
