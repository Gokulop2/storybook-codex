module.exports = {
  icon: true,
  typescript: true,
  jsxRuntime: "automatic",
  prettier: true,
  svgo: true,
  svgoConfig: {
    plugins: [
      { name: "removeViewBox", active: false },
      { name: "removeDimensions", active: true },
    ],
  },
  template: function ({ componentName, jsx }, { tpl }) {
    const cleanName = componentName.replace(/^Svg/, "");
    return tpl`
import * as React from 'react';
import type { SVGProps, FC } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

export const ${cleanName}: FC<Props> = ({ size = 24, color = 'currentColor', ...props }) => (
  React.cloneElement(
    ${jsx},
    {
      width: size,
      height: size,
      ...props,
    }
  )
);
${cleanName}.displayName = '${cleanName}';
`;
  },
};
