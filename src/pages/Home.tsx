import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import photo1 from "../assets/photo1.jpeg";
import photo2 from "../assets/photo2.jpeg";
import photo3 from "../assets/photo3.jpeg";

export default function Home() {
  const [showPhotos, setShowPhotos] = useState(false);
  const [cakeExploded, setCakeExploded] = useState(false);
  const [activePhotos, setActivePhotos] = useState<
    { src: string; x: number; y: number; rotation: number; scale: number }[]
  >([]);

  const handleCakeClick = () => {
    setCakeExploded(true);

    // Criar array com as 3 fotos em posições aleatórias
    const photosWithPositions = [
      {
        src: photo1,
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        rotation: Math.random() * 40 - 20,
        scale: 0.8 + Math.random() * 0.4,
      },
      {
        src: photo2,
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        rotation: Math.random() * 40 - 20,
        scale: 0.8 + Math.random() * 0.4,
      },
      {
        src: photo3,
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        rotation: Math.random() * 40 - 20,
        scale: 0.8 + Math.random() * 0.4,
      },
    ];

    setTimeout(() => {
      setActivePhotos(photosWithPositions);
      setShowPhotos(true);
    }, 400);
  };

  const handleClosePhotos = () => {
    setShowPhotos(false);
    setActivePhotos([]);
    setTimeout(() => {
      setCakeExploded(false);
    }, 500);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 relative flex items-center justify-center">
      {/* Balões decorativos em tons de roxo */}
      {[...Array(15)].map((_, i) => {
        const startX = Math.random() * 100;
        const endX = Math.random() * 100;
        const size = 20 + Math.floor(Math.random() * 64);
        const emojiPool = ["💜", "🟣", "👾", "🔮", "✨", "🌌"];
        const emoji = emojiPool[Math.floor(Math.random() * emojiPool.length)];

        return (
          <motion.div
            key={`balloon-${i}`}
            className="fixed select-none pointer-events-none z-0"
            style={{
              left: `${startX}vw`,
              fontSize: `${size}px`,
            }}
            initial={{
              top: "110vh",
              opacity: 0,
              scale: Math.random() * 0.6 + 0.6,
            }}
            animate={{
              top: `-${30 + Math.random() * 30}vh`,
              left: `${endX}vw`,
              opacity: [0, 1, 1, 0],
              rotate: (Math.random() - 0.5) * 60,
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10,
            }}
          >
            {emoji}
          </motion.div>
        );
      })}

      {/* Bolo */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <AnimatePresence>
          {!cakeExploded && (
            <motion.div
              className="relative cursor-pointer flex flex-col items-center justify-center"
              onClick={handleCakeClick}
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -15, 0],
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.3 },
              }}
            >
              {/* Container do Bolo */}
              <div className="relative mb-6">
                {/* Plate - Base do bolo */}
                <div className="relative w-[180px] h-[6px] bg-[#8b5cf6] mx-auto">
                  {/* Cake - Corpo do bolo */}
                  <div
                    className="absolute w-[140px] h-[70px] bg-[#a855f7] rounded-t-xl overflow-hidden left-1/2 transform -translate-x-1/2 -top-[70px] shadow-lg"
                    style={{
                      boxShadow: "inset 0 -20px #c084fc, inset 0 20px #6b21a8",
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    {/* Decoração do bolo - listras */}
                    <div
                      className="absolute top-2 w-full"
                      style={{
                        background:
                          "repeating-linear-gradient(90deg, #6b21a8, #6b21a8 8px, #a855f7 8px, #a855f7 16px)",
                        height: "4px",
                      }}
                    />

                    {/* Decoração do topo do bolo */}
                    <div
                      className="absolute top-3 left-2 w-[10px] h-[20px] bg-[#6b21a8] rounded-full"
                      style={{
                        boxShadow: `
                          15px 5px #a855f7,
                          30px 0px #6b21a8,
                          45px 2px #a855f7,
                          60px 5px #6b21a8,
                          75px 5px #a855f7,
                          90px 0px #6b21a8,
                          105px 5px #a855f7,
                          120px 5px #6b21a8
                        `,
                      }}
                    />
                  </div>

                  {/* Vela e chama central */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-[95px]">
                    {/* Bastão da vela */}
                    <div
                      className="absolute w-[6px] h-[30px] top-0 left-1/2 transform -translate-x-1/2"
                      style={{
                        background:
                          "repeating-linear-gradient(-45deg, #7e22ce, #7e22ce 2px, #a855f7 2px, #a855f7 4px)",
                      }}
                    />

                    {/* Pavio */}
                    <div className="absolute w-[1px] h-[6px] bg-purple-900 top-[-5px] left-1/2 transform -translate-x-1/2" />

                    {/* Chama */}
                    <motion.div
                      className="absolute w-[18px] h-[18px] bg-[#f0abfc] opacity-90 top-[-10px] left-1/2 transform -translate-x-1/2"
                      style={{
                        borderRadius: "80% 0 55% 50% / 55% 0 80% 50%",
                        transform: "translateX(-50%) rotate(-45deg)",
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.9, 0.7],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Velas adicionais */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`candle-${i}`}
                      className="absolute -top-[94px]"
                      style={{
                        left: `${30 + i * 35}px`,
                      }}
                    >
                      {/* Bastão da vela */}
                      <div
                        className="absolute w-[4px] h-[25px] top-0 left-1/2 transform -translate-x-1/2"
                        style={{
                          background:
                            "repeating-linear-gradient(-45deg, #7e22ce, #7e22ce 2px, #a855f7 2px, #a855f7 4px)",
                        }}
                      />

                      {/* Pavio */}
                      <div className="absolute w-[1px] h-[4px] bg-purple-900 top-[-4px] left-1/2 transform -translate-x-1/2" />

                      {/* Chama */}
                      <motion.div
                        className="absolute w-[14px] h-[14px] bg-[#f0abfc] opacity-80 top-[-8px] left-1/2 transform -translate-x-1/2"
                        style={{
                          borderRadius: "80% 0 55% 50% / 55% 0 80% 50%",
                          transform: "translateX(-50%) rotate(-45deg)",
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 0.8, 0.6],
                        }}
                        transition={{
                          duration: 1.2 + i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <motion.p
                className="text-white text-lg font-semibold bg-purple-900/60 px-6 py-3 rounded-full backdrop-blur-sm border border-purple-300/30"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                💜 Clique no bolo! 💜
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Partículas de explosão roxas */}
      <AnimatePresence>
        {cakeExploded && !showPhotos && (
          <>
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`explosion-${i}`}
                className="absolute left-1/2 top-1/2 text-2xl z-20 pointer-events-none"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.5) * 500,
                  opacity: [1, 0],
                  scale: [1, 2, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1 + Math.random() * 0.5,
                  ease: "easeOut",
                }}
              >
                {["💜", "🟣", "👾", "🔮", "✨"][i % 5]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Fotos saindo do bolo */}
      <AnimatePresence>
        {showPhotos && (
          <div
            className="fixed inset-0 w-screen h-screen flex items-center justify-center z-40 cursor-pointer"
            onClick={handleClosePhotos}
          >
            {/* Confetti roxo */}
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute w-3 h-3 rounded-full z-30 pointer-events-none"
                initial={{
                  x: "50vw",
                  y: "50vh",
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: `calc(50vw + ${(Math.random() - 0.5) * 1000}px)`,
                  y: `calc(50vh + ${(Math.random() - 0.5) * 800}px)`,
                  opacity: [1, 0],
                  scale: [0, 1, 0.5],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 1,
                  ease: "easeOut",
                }}
                style={{
                  backgroundColor: [
                    "#7c3aed",
                    "#6d28d9",
                    "#8b5cf6",
                    "#a855f7",
                    "#c084fc",
                    "#d946ef",
                    "#e879f9",
                    "#f0abfc",
                  ][i % 8],
                }}
              />
            ))}

            {/* Fotos saindo do centro */}
            {activePhotos.map((photo, index) => (
              <motion.div
                key={`photo-${index}`}
                className="absolute w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-300/80 backdrop-blur-sm z-40"
                style={{
                  left: `calc(50% + ${photo.x}vw)`,
                  top: `calc(50% + ${photo.y}vh)`,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                  rotate: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  scale: photo.scale,
                  opacity: 1,
                  rotate: photo.rotation,
                  x: "-50%",
                  y: "-50%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.2,
                }}
                whileHover={{
                  scale: photo.scale * 1.1,
                  rotate: photo.rotation + 5,
                  zIndex: 50,
                }}
              >
                <img
                  src={photo.src}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Efeito de brilho nas fotos */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/10 pointer-events-none"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            ))}

            {/* Mensagem flutuante */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center z-50"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 20px rgba(192, 132, 252, 0.5)",
                    "0 0 30px rgba(192, 132, 252, 0.8)",
                    "0 0 20px rgba(192, 132, 252, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                🎉 Parabéns xuxu! 🎉
              </motion.h2>

              <motion.p
                className="text-purple-100 text-lg bg-purple-900/50 px-6 py-3 rounded-full backdrop-blur-sm border border-purple-300/30"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Clique para fechar
              </motion.p>
            </motion.div>

            {/* Estrelas roxas ao redor */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-3xl text-purple-300 z-30"
                style={{
                  top: `${Math.sin((i * Math.PI) / 6) * 40 + 50}%`,
                  left: `${Math.cos((i * Math.PI) / 6) * 40 + 50}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 1],
                  rotate: 360,
                  opacity: [0, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                ⭐
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
