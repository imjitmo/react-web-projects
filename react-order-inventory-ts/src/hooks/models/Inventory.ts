export interface Inventory {
  id?: number;
  itemName: string;
  itemCategory: string;
  itemType: string;
  itemQuantity: number;
  itemUnit: string;
  itemAvailability: boolean;
  addedBy?: string | null;
  updatedBy?: string | null;
}
