export interface InputListItem {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholderTextColor?: string;
}
