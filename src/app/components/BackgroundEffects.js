"use client";

export default function BackgroundEffects({ mousePosition }) {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 animate-grid-flow" style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`
        }}></div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl opacity-20 animate-float-slow"
          style={{
            top: '10%',
            left: '5%',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        ></div>
        <div 
          className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full blur-3xl opacity-15 animate-float-medium"
          style={{
            bottom: '15%',
            right: '10%',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute w-[400px] h-[400px] bg-emerald-500 rounded-full blur-3xl opacity-10 animate-float-fast"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        ></div>
      </div>
    </>
  );
}