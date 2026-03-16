"use client";

export function BackgroundPaths() {
    return (
        <>
            <style>{`
                @keyframes blob-float-1 {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                    25% { transform: translate3d(30px, -20px, 0) scale(1.05); }
                    50% { transform: translate3d(-15px, -35px, 0) scale(0.95); }
                    75% { transform: translate3d(20px, -10px, 0) scale(1.02); }
                }
                @keyframes blob-float-2 {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                    33% { transform: translate3d(-25px, -30px, 0) scale(1.08); }
                    66% { transform: translate3d(15px, -15px, 0) scale(0.96); }
                }
                @keyframes blob-float-3 {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                    20% { transform: translate3d(15px, -25px, 0) scale(1.03); }
                    40% { transform: translate3d(-20px, -10px, 0) scale(0.97); }
                    60% { transform: translate3d(25px, -30px, 0) scale(1.06); }
                    80% { transform: translate3d(-10px, -15px, 0) scale(0.98); }
                }
                .bg-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    will-change: transform;
                    pointer-events: none;
                }
            `}</style>
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Top-left large blue blob */}
                <div
                    className="bg-blob"
                    style={{
                        width: 500,
                        height: 500,
                        top: "-10%",
                        left: "-8%",
                        background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)",
                        animation: "blob-float-1 25s ease-in-out infinite",
                    }}
                />
                {/* Top-right blue accent */}
                <div
                    className="bg-blob"
                    style={{
                        width: 400,
                        height: 400,
                        top: "0%",
                        right: "-5%",
                        background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 70%)",
                        animation: "blob-float-2 20s ease-in-out 2s infinite",
                    }}
                />
                {/* Center-left blob */}
                <div
                    className="bg-blob"
                    style={{
                        width: 400,
                        height: 400,
                        top: "35%",
                        left: "5%",
                        background: "radial-gradient(circle, rgba(30,64,175,0.2) 0%, rgba(30,64,175,0) 70%)",
                        animation: "blob-float-3 22s ease-in-out 1s infinite",
                    }}
                />
                {/* Bottom-right blue blob */}
                <div
                    className="bg-blob"
                    style={{
                        width: 500,
                        height: 500,
                        bottom: "-15%",
                        right: "0%",
                        background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(37,99,235,0) 70%)",
                        animation: "blob-float-1 28s ease-in-out 3s infinite",
                    }}
                />
                {/* Small floating geometric shapes */}
                <div
                    style={{
                        position: "absolute",
                        top: "15%",
                        left: "8%",
                        width: 55,
                        height: 55,
                        border: "2px solid rgba(37,99,235,0.3)",
                        borderRadius: 12,
                        background: "rgba(37,99,235,0.04)",
                        transform: "perspective(200px) rotateX(15deg) rotateY(-15deg)",
                        animation: "blob-float-2 18s ease-in-out infinite",
                        willChange: "transform",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "10%",
                        right: "12%",
                        width: 45,
                        height: 45,
                        border: "2px solid rgba(59,130,246,0.25)",
                        borderRadius: "50%",
                        background: "rgba(59,130,246,0.03)",
                        animation: "blob-float-3 16s ease-in-out 1s infinite",
                        willChange: "transform",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "55%",
                        right: "8%",
                        width: 40,
                        height: 40,
                        border: "2px solid rgba(30,64,175,0.25)",
                        borderRadius: 8,
                        background: "rgba(30,64,175,0.03)",
                        transform: "rotate(45deg)",
                        animation: "blob-float-1 20s ease-in-out 2s infinite",
                        willChange: "transform",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "70%",
                        left: "15%",
                        width: 50,
                        height: 50,
                        border: "2px solid rgba(37,99,235,0.2)",
                        borderRadius: "50%",
                        background: "rgba(37,99,235,0.03)",
                        transform: "perspective(200px) rotateX(45deg)",
                        animation: "blob-float-2 22s ease-in-out 0.5s infinite",
                        willChange: "transform",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "35%",
                        left: "50%",
                        width: 35,
                        height: 35,
                        border: "2px solid rgba(59,130,246,0.2)",
                        borderRadius: 10,
                        background: "rgba(59,130,246,0.03)",
                        transform: "perspective(200px) rotateY(20deg)",
                        animation: "blob-float-3 19s ease-in-out 1.5s infinite",
                        willChange: "transform",
                    }}
                />
                {/* Small dots */}
                <div
                    style={{
                        position: "absolute",
                        top: "25%",
                        right: "25%",
                        width: 8,
                        height: 8,
                        backgroundColor: "rgba(37,99,235,0.4)",
                        borderRadius: "50%",
                        animation: "blob-float-1 14s ease-in-out infinite",
                        willChange: "transform",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "60%",
                        left: "35%",
                        width: 6,
                        height: 6,
                        backgroundColor: "rgba(59,130,246,0.35)",
                        borderRadius: "50%",
                        animation: "blob-float-2 12s ease-in-out 1s infinite",
                        willChange: "transform",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "45%",
                        right: "18%",
                        width: 5,
                        height: 5,
                        backgroundColor: "rgba(30,64,175,0.35)",
                        borderRadius: "50%",
                        animation: "blob-float-3 15s ease-in-out 2s infinite",
                        willChange: "transform",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "80%",
                        right: "30%",
                        width: 7,
                        height: 7,
                        backgroundColor: "rgba(37,99,235,0.3)",
                        borderRadius: "50%",
                        animation: "blob-float-1 16s ease-in-out 0.5s infinite",
                        willChange: "transform",
                    }}
                />
            </div>
        </>
    );
}
