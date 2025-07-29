import { ReactNode } from "react";

interface GradientSpotProps {
  children?: ReactNode;
  scale?: string;
  height?: string;
  width?: string;
  tilt?: string;
  inset?: string;
  gradient: number;
  className?: string;
}

/*
blur-3xl - makes  ablur that does not look like a shape
-z-10 - Places it behind the text
scale-110 - makes it larger
*/

const GradientSpot = ({
  children,
  scale = "scale-110",
  inset = "inset-0",
  height = "",
  width = "",
  tilt = "",
  gradient,
  className = "",
}: GradientSpotProps) => {
  const grad =
    gradient == 1
      ? "from-orange-200 via-orange-300 to-yellow-200"
      : "from-blue-400 via-purple-400 to-blue-300";
  return (
    <div className={`relative ${className}`}>
      {/* Simple gradient background */}
      <div
        className={`absolute ${inset} bg-gradient-to-r ${grad} blur-3xl -z-10 ${height} ${width} ${tilt} transform ${scale}`}
        style={{ opacity: 0.3 }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientSpot;
