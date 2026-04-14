export type FeatureCategory = 'feature' | 'module' | 'benefit' | 'role_impact' | 'club_module';

export interface FeatureDTO {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string | null;
  category: FeatureCategory;
}
