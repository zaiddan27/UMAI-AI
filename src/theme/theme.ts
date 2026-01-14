export const colors = {
  primaryGreen: '#2ecc71',
  primaryGreenDark: '#27ae60', // for gradients/active states
  primaryBlue: '#3498db',
  primaryBlueDark: '#2980b9',
  text: {
    dark: '#2c3e50',
    light: '#7f8c8d',
    white: '#ffffff',
  },
  background: {
    main: '#f5f5f5', // light gray background
    card: '#ffffff',
  },
  status: {
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
  },
  border: '#e0e0e0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20, // Standard container padding
  xl: 32,
};

export const typography = {
  fontFamily: {
    regular: 'System', // Will replace with custom font loading later if needed
    bold: 'System',
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16, // Body
    lg: 18, // Buttons
    xl: 24, // Headers
    xxl: 32, // Large Titles
  },
  weight: {
    regular: '400' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius: {
    sm: 8,
    md: 12, // Inputs
    lg: 15, // Cards
  },
};
