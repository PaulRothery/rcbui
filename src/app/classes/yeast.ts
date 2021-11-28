export class Yeast {
  id!: string;
  strain!: string;
  date!: Date;
  supplier!: string;
  maltster!: string;
  lotNumber!: string;
  brand!: string;
  previousBatchId!: number;
  previousBatchBrand!: string;
  generation!: number;
  cellCount!: number;
  viability!: number;
  initialQuantity!: number;
  currentQuantity!: number;
}