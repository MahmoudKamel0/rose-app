export type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
};

export type OccasionCardProps = {
  id: string;
  name: string;
  image: string;
  selected: boolean;
  onToggle: () => void;
}