// =============================================
// Badge.jsx
// =============================================

import './Badge.css';

/**
 * variant: 'default' | 'blue' | 'purple' | 'green'
 */
export default function Badge({ children, variant = 'default' }) {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  );
}
