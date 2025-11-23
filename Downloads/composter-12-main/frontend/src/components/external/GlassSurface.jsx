import { memo } from 'react';

/**
 * Lightweight GlassSurface component using CSS-only glass effect
 * Replaces the heavy SVG filter implementation for better performance
 */
const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  className = '',
  style = {},
  ...rest
}) => {
  const containerStyles = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={containerStyles}
      {...rest}
    >
      <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
};

export default memo(GlassSurface);
