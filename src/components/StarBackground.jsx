import { useEffect, useState, useMemo } from "react";

export const StarBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const stars = useMemo(() => {
    if (dimensions.width === 0) return [];
    
    const numberOfStars = Math.floor((dimensions.width * dimensions.height) / 3000);
    
    return Array.from({ length: numberOfStars }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.4 + 0.2,
      animationDuration: Math.random() * 4 + 3,
      animationDelay: Math.random() * 3,
    }));
  }, [dimensions]);

  const meteors = useMemo(() => {
    if (dimensions.width === 0) return [];
    
    const numberOfMeteors = Math.min(3, Math.floor(dimensions.width / 500));
    
    return Array.from({ length: numberOfMeteors }, (_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 30,
      delay: Math.random() * 15 + i * 5,
      animationDuration: Math.random() * 2 + 4,
    }));
  }, [dimensions]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}

      {/* Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 60}px`,
            height: `${meteor.size * 2}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
};
