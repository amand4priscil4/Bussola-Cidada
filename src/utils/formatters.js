import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (isoString) => {
  if (!isoString) return '-';
  try {
    return format(parseISO(isoString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch (error) {
    return isoString;
  }
};

export const formatDateShort = (isoString) => {
  if (!isoString) return '-';
  try {
    return format(parseISO(isoString), 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    return isoString;
  }
};

export const formatCoordinates = (lat, lng) => {
  return `${lat?.toFixed(6)}, ${lng?.toFixed(6)}`;
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};
