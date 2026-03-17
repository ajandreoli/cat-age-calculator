import { useState } from "react";
import catPhoto from "./assets/rupert.jpg";

function catToHumanAge(catYears) {
  if (catYears <= 0) return 0;
  if (catYears <= 1) return Math.round(catYears * 15);
  if (catYears <= 2) return Math.round(15 + (catYears - 1) * 9);
  return Math.round(24 + (catYears - 2) * 4);
}

function getAgeDescription(humanAge) {
  if (humanAge < 13) return "A playful little kitten at heart!";
  if (humanAge < 20) return "A wild teenage dreamer!";
  if (humanAge < 30) return "Young, free & totally fabulous!";
  if (humanAge < 50) return "A wise and wonderful adult!";
  if (humanAge < 65) return "Experienced, elegant & amazing!";
  if (humanAge < 80) return "A glorious senior superstar!";
  return "A legendary, magical elder!";
}

function calculateAgeFromBirthday(birthday) {
  const today = new Date();
  const birth = new Date(birthday);
  const diffMs = today - birth;
  if (diffMs < 0) return null;
  return diffMs / (1000 * 60 * 60 * 24 * 365.25);
}

function Cloud({ style }) {
  return (
    <div style={{ position: "absolute", ...style }}>
      <div style={{
        position: "relative",
        width: "90px",
        height: "40px",
      }}>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "26px",
          background: "rgba(255,255,255,0.85)", borderRadius: "20px",
        }} />
        <div style={{
          position: "absolute", bottom: "14px", left: "14px",
          width: "36px", height: "36px",
          background: "rgba(255,255,255,0.85)", borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "16px", left: "32px",
          width: "28px", height: "28px",
          background: "rgba(255,255,255,0.85)", borderRadius: "50%",
        }} />
      </div>
    </div>
  );
}

function Sparkle({ style }) {
  return (
    <div style={{
      position: "absolute",
      fontSize: "18px",
      animation: "sparkle 1.4s ease-in-out infinite",
      animationDelay: style.animationDelay || "0s",
      ...style,
    }}>✦</div>
  );
}

export default function CatAgeCalculator() {
  const [inputMode, setInputMode] = useState("age");
  const [ageInput, setAgeInput] = useState("");
  const [birthdayInput, setBirthdayInput] = useState("");

  let catYears = null;
  if (inputMode === "age" && ageInput !== "") {
    const parsed = parseFloat(ageInput);
    if (!isNaN(parsed) && parsed >= 0) catYears = parsed;
  } else if (inputMode === "birthday" && birthdayInput !== "") {
    const years = calculateAgeFromBirthday(birthdayInput);
    if (years !== null) catYears = years;
  }

  const humanAge = catYears !== null ? catToHumanAge(catYears) : null;
  const catAgeDisplay =
    catYears !== null
      ? catYears < 1
        ? `${Math.round(catYears * 12)} months`
        : `${catYears.toFixed(1)} years`
      : null;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={styles.page}>
      {/* Floating background clouds */}
      <Cloud style={{ top: "6%",  left: "4%",  animation: "floatSlow 7s ease-in-out infinite" }} />
      <Cloud style={{ top: "12%", right: "6%", animation: "floatSlow 9s ease-in-out infinite", animationDelay: "2s", transform: "scale(1.3)" }} />
      <Cloud style={{ bottom: "18%", left: "2%", animation: "floatSlow 8s ease-in-out infinite", animationDelay: "1s", transform: "scale(0.8)" }} />
      <Cloud style={{ bottom: "10%", right: "3%", animation: "floatSlow 10s ease-in-out infinite", animationDelay: "3s", transform: "scale(1.1)" }} />
      <Cloud style={{ top: "40%", left: "1%",  animation: "floatSlow 11s ease-in-out infinite", animationDelay: "0.5s", transform: "scale(0.7)" }} />
      <Cloud style={{ top: "55%", right: "2%", animation: "floatSlow 8s ease-in-out infinite", animationDelay: "4s", transform: "scale(0.9)" }} />

      {/* Sparkles */}
      <Sparkle style={{ top: "8%",  left: "18%", color: "#ff6bd6", animationDelay: "0s" }} />
      <Sparkle style={{ top: "20%", right: "15%", color: "#ffe900", animationDelay: "0.4s" }} />
      <Sparkle style={{ top: "70%", left: "12%", color: "#00e5ff", animationDelay: "0.8s" }} />
      <Sparkle style={{ bottom: "20%", right: "14%", color: "#b44fff", animationDelay: "0.2s" }} />
      <Sparkle style={{ top: "45%", left: "5%", color: "#ff6b6b", animationDelay: "1.1s" }} />
      <Sparkle style={{ top: "35%", right: "8%", color: "#69ff47", animationDelay: "0.6s" }} />
      <Sparkle style={{ bottom: "35%", left: "20%", color: "#ff9f43", animationDelay: "1.5s" }} />

      <div style={styles.card}>
        {/* Rainbow top bar */}
        <div style={styles.rainbowBar} />

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.photoWrapper}>
            <img src={catPhoto} alt="Rupert" style={styles.catPhoto} />
            {/* Rainbow ring */}
            <div style={styles.rainbowRing} />
          </div>

          <h1 style={styles.title}>So, How Old<br />is My Cat?</h1>
          <p style={styles.subtitle}>✨ Enter your cat's info below ✨</p>
        </div>

        {/* Rainbow divider */}
        <div style={styles.rainbowDivider} />

        {/* Toggle */}
        <div style={styles.toggleRow}>
          <button
            style={inputMode === "age" ? { ...styles.toggleBtn, ...styles.toggleBtnActive } : styles.toggleBtn}
            onClick={() => setInputMode("age")}
          >
            🎂 Age in Hooman Years
          </button>
          <button
            style={inputMode === "birthday" ? { ...styles.toggleBtn, ...styles.toggleBtnActiveAlt } : styles.toggleBtn}
            onClick={() => setInputMode("birthday")}
          >
            🎀 Birthday
          </button>
        </div>

        {/* Input */}
        <div style={styles.inputSection}>
          {inputMode === "age" ? (
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="age-input">
                Cat's age in hooman years
              </label>
              <input
                id="age-input"
                type="number"
                min="0"
                max="30"
                step="0.1"
                placeholder="e.g. 3 or 0.5"
                value={ageInput}
                onChange={(e) => setAgeInput(e.target.value)}
                style={styles.input}
              />
            </div>
          ) : (
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="birthday-input">
                Cat's birthday
              </label>
              <input
                id="birthday-input"
                type="date"
                max={today}
                value={birthdayInput}
                onChange={(e) => setBirthdayInput(e.target.value)}
                style={styles.input}
              />
            </div>
          )}
        </div>

        {/* Result */}
        {humanAge !== null && (
          <div style={styles.result}>
            <p style={styles.resultLabel}>Your cat is {catAgeDisplay} old, which is...</p>
            <div style={styles.humanAgeWrapper}>
              <p style={styles.humanAge}>{humanAge}</p>
              <p style={styles.humanAgeUnit}>human years! 🌈</p>
            </div>
            <p style={styles.description}>{getAgeDescription(humanAge)}</p>
          </div>
        )}

        {/* Rainbow bottom bar */}
        <div style={styles.rainbowBar} />

        <p style={styles.footerText}>
          🐱 Based on the Feline Advisory Bureau scale 🐱
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #c9f0ff 0%, #e8d5ff 30%, #ffd6f0 60%, #fff4c2 100%)",
    backgroundSize: "300% 300%",
    animation: "rainbowShift 12s ease infinite",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    fontFamily: "'Nunito', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    background: "rgba(255, 255, 255, 0.78)",
    backdropFilter: "blur(16px)",
    borderRadius: "32px",
    boxShadow: "0 8px 48px rgba(180,100,255,0.18), 0 2px 0 rgba(255,255,255,0.9) inset",
    padding: "0 0 8px",
    maxWidth: "420px",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
    border: "3px solid rgba(255,255,255,0.9)",
  },
  rainbowBar: {
    height: "10px",
    background: "linear-gradient(90deg, #ff6b6b, #ff9f43, #ffe900, #69ff47, #00e5ff, #b44fff, #ff6bd6)",
  },
  rainbowDivider: {
    height: "4px",
    borderRadius: "2px",
    margin: "0 28px 24px",
    background: "linear-gradient(90deg, #ff6b6b, #ff9f43, #ffe900, #69ff47, #00e5ff, #b44fff, #ff6bd6)",
    opacity: 0.7,
  },
  header: {
    textAlign: "center",
    padding: "28px 28px 20px",
  },
  photoWrapper: {
    position: "relative",
    width: "110px",
    height: "110px",
    margin: "0 auto 18px",
  },
  catPhoto: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #fff",
    boxShadow: "0 4px 20px rgba(180,100,255,0.3)",
    position: "relative",
    zIndex: 1,
    display: "block",
    margin: "5px auto 0",
    animation: "float 4s ease-in-out infinite",
  },
  rainbowRing: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff6b6b, #ff9f43, #ffe900, #69ff47, #00e5ff, #b44fff, #ff6bd6)",
    animation: "spin 4s linear infinite",
    zIndex: 0,
  },
  title: {
    fontSize: "26px",
    fontWeight: "900",
    fontFamily: "'Fredoka One', sans-serif",
    background: "linear-gradient(135deg, #ff6bd6, #b44fff, #00e5ff)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "shimmer 3s linear infinite",
    lineHeight: 1.3,
    marginBottom: "10px",
    letterSpacing: "0.01em",
  },
  subtitle: {
    fontSize: "13px",
    color: "#c06fdf",
    fontWeight: "700",
  },
  toggleRow: {
    display: "flex",
    gap: "12px",
    padding: "0 28px",
    marginBottom: "20px",
  },
  toggleBtn: {
    flex: 1,
    padding: "11px 8px",
    borderRadius: "16px",
    border: "2.5px solid #e0c8f8",
    background: "rgba(255,255,255,0.6)",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "800",
    color: "#b884e8",
    transition: "all 0.2s",
  },
  toggleBtnActive: {
    background: "linear-gradient(135deg, #ff6bd6, #b44fff)",
    border: "2.5px solid transparent",
    color: "#fff",
    boxShadow: "0 4px 16px rgba(180,79,255,0.35)",
    transform: "translateY(-1px)",
  },
  toggleBtnActiveAlt: {
    background: "linear-gradient(135deg, #00c9ff, #00e5ff)",
    border: "2.5px solid transparent",
    color: "#fff",
    boxShadow: "0 4px 16px rgba(0,200,255,0.35)",
    transform: "translateY(-1px)",
  },
  inputSection: {
    padding: "0 28px 24px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#c06fdf",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  input: {
    padding: "13px 18px",
    borderRadius: "16px",
    border: "2.5px solid #e8c8fa",
    background: "rgba(255,255,255,0.8)",
    fontSize: "15px",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "700",
    color: "#7c3aed",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s, box-shadow 0.2s",
    colorScheme: "light",
  },
  result: {
    margin: "0 20px 24px",
    background: "linear-gradient(135deg, rgba(255,220,255,0.7), rgba(200,230,255,0.7))",
    borderRadius: "24px",
    padding: "24px 20px",
    textAlign: "center",
    border: "2.5px solid rgba(255,255,255,0.9)",
    boxShadow: "0 4px 24px rgba(180,100,255,0.12)",
  },
  resultLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#a855f7",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  humanAgeWrapper: {
    margin: "4px 0 12px",
  },
  humanAge: {
    fontSize: "72px",
    fontWeight: "900",
    fontFamily: "'Fredoka One', sans-serif",
    background: "linear-gradient(135deg, #ff6b6b, #ff9f43, #ffe900, #69ff47, #00e5ff, #b44fff)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "shimmer 2s linear infinite",
    lineHeight: 1,
  },
  humanAgeUnit: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#b44fff",
    marginTop: "4px",
  },
  description: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#7c6faf",
    fontStyle: "italic",
  },
  footerText: {
    fontSize: "11px",
    color: "#c084e8",
    textAlign: "center",
    fontWeight: "700",
    padding: "12px 0 8px",
  },
};
