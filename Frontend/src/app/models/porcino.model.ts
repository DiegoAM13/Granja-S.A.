export interface Porcino {
  identificacion: string;
  edad: number;
  peso: number;
  razaId: number;
  alimentacionTipo: number;
  clienteCedula: string;
}

export interface PorcinoDTO {
  identificacion: string;
  edad: number;
  peso: number;
  razaId: number;
  alimentacionTipo: number;
  clienteCedula: string;
  razaNombre?: string;
  alimentacionDescripcion?: string;
  clienteNombre?: string;
}
