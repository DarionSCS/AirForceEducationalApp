import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // (omtrek cirkel = 2 * pi * radius)
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Html center>
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          style={{ transform: "rotate(-90deg)" }} // start from the top of the circle
        >
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#f1f1f1"
            strokeWidth="10"
            fill="none"
            opacity="0.2"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#f1f1f1"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference} // length of the dash
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }} // animation
          />
        </svg>
        {/* div with the percentage */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 14,
            color: "#f1f1f1",
            fontWeight: 800,
          }}
        >
          {progress.toFixed(2)}%
        </div>
      </div>
    </Html>
  );
};

export default Loader;
