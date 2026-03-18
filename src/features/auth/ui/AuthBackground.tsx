"use client";

export function AuthBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            {/* Dark base background */}
            <div className="absolute inset-0 bg-black" />

            {/* Gradient Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/30 rounded-full blur-[120px]" />

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                }}
            />

            {/* Noise/Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
