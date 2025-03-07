export const formatToDisplay = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR"); // Formata para dd/MM/yyyy
};

export const formatToISOWithTimezone = (dateString: string) => {
  if (!dateString) return "";

  // Quebrar a string "dd/MM/yyyy" em partes
  const [day, month, year] = dateString.split("/").map(Number);

  // Criar um objeto Date no UTC
  const date = new Date(Date.UTC(year, month - 1, day, 3, 0, 0)); // Adicionando 3 horas (03:00:00)

  // Retorna no formato ISO correto
  return date.toISOString();
};

export const formatDateToGMT3 = (dateString: string): string => {
  if (!dateString) return ""; // Se não houver data, retorna string vazia

  try {
    const date = new Date(dateString + "T00:00:00"); // Garante um formato válido
    date.setHours(date.getHours() + 3); // Ajusta para GMT-3
    return date.toISOString(); // Converte para formato correto
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "";
  }
};
