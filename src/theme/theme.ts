export type Theme = {
  background: string;
  card: string;
  text: string;
  subtext: string;
  border: string;
  primary: string;
  danger: string;
};

export const lightTheme: Theme = {
  background: '#ffffff',
  card: '#eeeeee',
  text: '#111827',
  subtext: '#6b7280',
  border: '#d1d5db',
  primary: '#007aff',
  danger: '#dc2626',
};

export const darkTheme: Theme = {
  background: '#111827',
  card: '#1f2937',
  text: '#f9fafb',
  subtext: '#9ca3af',
  border: '#374151',
  primary: '#60a5fa',
  danger: '#f87171',
};
