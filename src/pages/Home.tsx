import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import photo1 from "../assets/photo1.jpeg";
import photo2 from "../assets/photo2.jpeg";
import photo3 from "../assets/photo3.jpeg";

export default function Home() {
  const [showPhoto, setShowPhoto] = useState(false);
  const [cakeExploded, setCakeExploded] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleCakeClick = () => {
    setCakeExploded(true);
    // escolher foto aleatória
    setPhotoIndex(Math.floor(Math.random() * 3));
    setTimeout(() => {
      setShowPhoto(true);
    }, 400);
  };

  const handleClosePhoto = () => {
    setShowPhoto(false);
    setTimeout(() => {
      setCakeExploded(false);
    }, 300);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-700 relative flex items-center justify-center">
      {/* Confetti/Sparkles decorativos */}
      <AnimatePresence>
        {showPhoto && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full"
                initial={{
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 1000,
                  y: (Math.random() - 0.5) * 800,
                  opacity: 0,
                  scale: 1,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.3,
                }}
                style={{
                  background: [
                    "#ff6b6b",
                    "#4ecdc4",
                    "#45b7d1",
                    "#f9ca24",
                    "#ff9ff3",
                  ][i % 5],
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Bolo de Aniversário */}
      <AnimatePresence>
        {!cakeExploded && (
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <motion.div
              className="relative cursor-pointer flex flex-col items-center justify-center"
              onClick={handleCakeClick}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.08, rotate: [0, -3, 3, -3, 0] }}
              whileTap={{ scale: 0.95 }}
            >
              {/* base do bolo (vai ficar) */}
              <motion.div
                className="text-[150px]"
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                exit={{
                  scale: [1, 0.9, 0],
                  opacity: [1, 0.5, 0],
                  transition: { duration: 0.6 },
                }}
              >
                🎂
              </motion.div>

              {/* tampa do bolo (simulada) - essa parte vai se mover para cima ao explodir */}
              <motion.div
                className="absolute top-0 flex justify-center w-full pointer-events-none"
                initial={{ y: 0 }}
                exit={{
                  y: -180,
                  rotate: 20,
                  opacity: 0,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <div style={{ fontSize: 90, transform: "translateY(-10px)" }}>
                  🧁
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Partículas de explosão do bolo */}
      <AnimatePresence>
        {cakeExploded && !showPhoto && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`cake-particle-${i}`}
                className="absolute left-1/2 top-1/2 text-3xl z-[15]"
                initial={{}}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  rotate: Math.random() * 720,
                  opacity: [1, 1, 0],
                  scale: [1, 1.5, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                {["🍰", "🎂", "✨", "💫", "🌟"][i % 5]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Balões decorativos */}
      {
        // quantidade aleatória entre 12 e 22
        [...Array(12 + Math.floor(Math.random() * 11))].map((_, i) => {
          const startX = Math.random() * 100; // vw
          const endX = Math.random() * 100; // vw
          const size = 20 + Math.floor(Math.random() * 64);
          const emojiPool = ["🎈", "🎊", "🎉", "🎁", "✨"];
          const emoji = emojiPool[Math.floor(Math.random() * emojiPool.length)];

          return (
            <motion.div
              key={`balloon-${i}`}
              className="fixed select-none pointer-events-none"
              style={{
                left: `${startX}vw`,
                bottom: undefined,
                top: undefined,
                zIndex: 5,
                fontSize: `${size}px`,
              }}
              initial={{
                top: `${100 + Math.random() * 30}vh`,
                opacity: 0,
                scale: Math.random() * 0.6 + 0.6,
              }}
              animate={{
                top: `-${10 + Math.random() * 30}vh`,
                left: `${endX}vw`,
                opacity: [0, 1, 1, 0],
                rotate: (Math.random() - 0.5) * 60,
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
                repeatDelay: Math.random() * 3,
              }}
            >
              {emoji}
            </motion.div>
          );
        })
      }

      {/* Foto que aparece saindo do bolo */}
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black/90 z-[100] cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClosePhoto}
          >
            {/* Container da foto com borda decorativa */}
            <motion.div
              className="relative p-5 bg-gradient-to-br from-pink-400 via-red-400 to-pink-500 rounded-2xl shadow-2xl"
              initial={{
                y: "50vh",
                x: "-50%",
                scale: 0.1,
                opacity: 0,
                rotate: 360,
              }}
              animate={{
                y: 0,
                x: 0,
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              exit={{
                y: "50vh",
                scale: 0.1,
                opacity: 0,
                rotate: -360,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.8,
              }}
            >
              {/* Estrelas ao redor da foto */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute text-[35px]"
                  style={{
                    top: `${Math.sin((i * Math.PI) / 6) * 220 + 50}%`,
                    left: `${Math.cos((i * Math.PI) / 6) * 220 + 50}%`,
                    filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    rotate: 360,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                >
                  ⭐
                </motion.div>
              ))}

              {/* Fogos de artifício extras */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`firework-${i}`}
                  className="absolute top-1/2 left-1/2 text-xl"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 2, 0],
                    opacity: [1, 0.5, 0],
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                >
                  ✨
                </motion.div>
              ))}

              <motion.div
                className="w-[450px] h-[450px] bg-gradient-to-br from-orange-100 via-peach-200 to-orange-300 rounded-2xl flex items-center justify-center text-[220px] shadow-xl relative overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                  opacity: {
                    duration: 0.3,
                  },
                }}
              >
                {/* Substituir emoji por imagem */}
                <motion.img
                  src={[photo1, photo2, photo3][photoIndex]}
                  alt="foto"
                  className="w-full h-full object-cover rounded-xl"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                />
              </motion.div>

              {/* Corações flutuantes */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute bottom-0 text-[28px]"
                  style={{
                    left: `${5 + i * 6.5}%`,
                    filter: "drop-shadow(0 0 5px rgba(255, 105, 180, 0.6))",
                  }}
                  initial={{ y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    y: [-20, -120],
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0.8],
                    x: [
                      (Math.random() - 0.5) * 50,
                      (Math.random() - 0.5) * 120,
                    ],
                    rotate: [0, (Math.random() - 0.5) * 180],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                >
                  {["❤️", "💖", "💕", "💗", "💓"][i % 5]}
                </motion.div>
              ))}

              <motion.p
                className="text-center mt-5 text-[32px] font-bold bg-gradient-to-r from-white via-yellow-300 to-white bg-clip-text text-transparent bg-[length:200%_auto]"
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  opacity: { delay: 0.5, duration: 0.3 },
                  y: {
                    delay: 0.8,
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    delay: 0.8,
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                🎊 Parabéééééns xuxu! 🎊
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
