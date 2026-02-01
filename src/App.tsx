import { Scene } from './components/Scene';
import { VideoScroll } from './components/VideoScroll';
import { ScrollSection } from './components/ScrollSection';
import { MouseParticles } from './components/MouseParticles';

// Products
import sesameBk from './assets/sesame-black.png';
import sesameWh from './assets/sesame-white.png';
import hubBk from './assets/hub-black.png';
import hubWh from './assets/hub-white.png';

import { Cpu, Wifi, Sparkles, MoveDown, Lock, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
    // Version ID: immersive-forest-opt-v1.0.0
    return (
        <main className="relative min-h-[400vh] text-forest-50 font-sans selection:bg-forest-500/30 bg-transparent">
            {/* Video Background */}
            <VideoScroll />

            {/* Particles & Scene */}
            <MouseParticles />
            <Scene />

            {/* Hero Section */}
            <header className="h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="p-8 md:p-12 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5"
                >
                    <span className="inline-block py-1 px-4 rounded-full border border-forest-400/30 bg-forest-900/40 backdrop-blur-md text-xs tracking-[0.2em] uppercase mb-8 text-forest-300 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                        Smart Living Redefined
                    </span>
                    <h1 className="font-serif text-4xl md:text-7xl mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-forest-50 to-forest-300 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] leading-tight">
                        スマートホームで<br />
                        より自由に。
                    </h1>
                    <p className="text-forest-100/90 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto leading-relaxed drop-shadow-md">
                        キーレス、ストレスレス。<br />
                        <span className="text-sm md:text-base opacity-70 mt-2 block font-serif italic">More Freedom with Smart Home.</span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-12 animate-bounce text-forest-200/50"
                >
                    <MoveDown size={24} />
                    <span className="block text-[10px] tracking-widest mt-2 uppercase opacity-50">Scroll</span>
                </motion.div>
            </header>

            {/* Story Section 1: Silence & Control */}
            <ScrollSection className="h-[800vh]">
                <div className="text-center md:text-left md:flex md:items-center md:gap-16 bg-black/60 backdrop-blur-xl p-8 md:p-16 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="flex-1 mb-8 md:mb-0">
                        <Lock className="w-16 h-16 mx-auto md:mx-0 mb-6 text-forest-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]" strokeWidth={1} />
                        <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight drop-shadow-lg text-white">
                            静寂が、<br />
                            <span className="text-forest-300">快適さを</span>呼び覚ます。
                        </h2>
                    </div>
                    <div className="flex-1 border-t md:border-t-0 md:border-l border-forest-500/30 pt-8 md:pt-0 md:pl-12">
                        <p className="text-forest-50 text-lg md:text-xl leading-loose font-light drop-shadow-md">
                            鍵を探す時間はもう終わり。<br />
                            あなたの帰宅を感知し、<br />
                            まるで魔法のように扉が開く。<br />
                            <br />
                            <span className="text-white font-medium border-b border-forest-500/50 pb-1">ストレスフリーな毎日</span>へ。
                        </p>
                    </div>
                </div>
            </ScrollSection>

            {/* Story Section 2: Connection & Intelligence */}
            <ScrollSection className="h-[800vh]" customRanges={[0.1, 0.25, 0.75, 0.9]}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
                    {/* Feature 1 */}
                    <div className="bg-black/60 backdrop-blur-xl p-10 rounded-3xl border border-white/10 hover:bg-black/70 transition-colors duration-500 group shadow-lg">
                        <Wifi className="w-12 h-12 mb-6 text-forest-300 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                        <h3 className="font-serif text-2xl mb-4 text-forest-50">目に見えない繋がり</h3>
                        <p className="text-forest-100/90 leading-relaxed font-light">
                            WiFiとBluetoothのデュアルコネクト。<br />
                            どこにいても、家の状態が手にとるようにわかる。<br />
                            離れていても、心は繋がっている。
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-gradient-to-br from-forest-900/80 to-black/80 backdrop-blur-xl p-10 rounded-3xl border border-forest-500/20 hover:border-forest-400/40 transition-colors duration-500 group mt-8 md:mt-16 shadow-lg">
                        <Cpu className="w-12 h-12 mb-6 text-forest-200 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                        <h3 className="font-serif text-2xl mb-4 text-forest-50">生活に溶け込む知性</h3>
                        <p className="text-forest-100/90 leading-relaxed font-light">
                            Matter対応で、あらゆるデバイスと連携。<br />
                            最先端のテクノロジーが、<br />
                            森の空気のように自然に、<br />
                            あなたの生活をサポートします。
                        </p>
                    </div>
                </div>
            </ScrollSection>

            {/* Final Message */}
            <ScrollSection className="h-[800vh]" customRanges={[0.4, 0.5, 0.95, 0.99]}>
                <div className="text-center relative bg-black/40 backdrop-blur-md p-12 rounded-full border border-white/5 shadow-2xl">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-forest-500/10 to-transparent blur-3xl -z-10" />

                    <p className="text-sm tracking-[0.4em] uppercase text-forest-300 mb-8 opacity-80 mix-blend-plus-lighter">Welcome Home</p>
                    <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-none drop-shadow-2xl text-white">
                        未来は、<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-100 to-forest-400">ここにある。</span>
                    </h2>
                </div>
            </ScrollSection>

            {/* Product Recommendations */}
            <ScrollSection persistAtEnd={true}>
                <div className="w-full max-w-6xl flex flex-col items-center">
                    <div className="text-center mb-16 bg-black/50 backdrop-blur-md px-10 py-6 rounded-full border border-white/10 inline-block mx-auto shadow-lg">
                        <h2 className="font-serif text-3xl tracking-[0.2em] mb-3 text-white">RECOMMENDED DEVICES</h2>
                        <div className="flex items-center justify-center gap-3 text-forest-300">
                            <Sparkles size={16} className="animate-pulse" />
                            <span className="text-xs uppercase tracking-widest font-medium">Upgrade Your Life</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
                        {/* Product 1: SESAME 5 Pro */}
                        <div className="bg-black/40 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/10 hover:border-forest-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] flex flex-col items-center text-center group">
                            <div className="mb-8 relative h-64 flex items-center justify-center gap-4">
                                <motion.img
                                    src={sesameBk}
                                    alt="SESAME 5 Pro Black"
                                    width={200}
                                    height={300}
                                    loading="lazy"
                                    className="h-full w-auto object-contain drop-shadow-2xl"
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                />
                                <motion.img
                                    src={sesameWh}
                                    alt="SESAME 5 Pro White"
                                    width={200}
                                    height={300}
                                    loading="lazy"
                                    className="h-full w-auto object-contain drop-shadow-2xl"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-2">SESAME 5 Pro</h3>
                            <p className="text-forest-200 text-sm mb-6">究極のスマートロック体験</p>
                            <a
                                href="https://a.r10.to/h5pKlz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto px-8 py-3 min-h-[48px] bg-forest-500/20 hover:bg-forest-500/40 text-forest-100 rounded-full border border-forest-500/50 transition-all flex items-center gap-2"
                            >
                                <Lock size={16} />
                                View on Rakuten
                            </a>
                        </div>

                        {/* Product 2: Hub3 */}
                        <div className="bg-black/40 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/10 hover:border-forest-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] flex flex-col items-center text-center group">
                            <div className="mb-8 relative h-64 flex items-center justify-center gap-8">
                                <motion.img
                                    src={hubBk}
                                    alt="Hub3 Black"
                                    width={200}
                                    height={300}
                                    loading="lazy"
                                    className="h-4/5 w-auto object-contain drop-shadow-2xl"
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                />
                                <motion.img
                                    src={hubWh}
                                    alt="Hub3 White"
                                    width={200}
                                    height={300}
                                    loading="lazy"
                                    className="h-4/5 w-auto object-contain drop-shadow-2xl"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-2">SESAME Hub3</h3>
                            <p className="text-forest-200 text-sm mb-6">リモート操作で、もっと自由に</p>
                            <a
                                href="https://a.r10.to/h5919g"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto px-8 py-3 min-h-[48px] bg-forest-500/20 hover:bg-forest-500/40 text-forest-100 rounded-full border border-forest-500/50 transition-all flex items-center gap-2"
                            >
                                <Radio size={16} />
                                View on Rakuten
                            </a>
                        </div>
                    </div>

                    {/* Consultation Button */}
                    <div className="mt-16 w-full flex justify-center">
                        <a
                            href="https://lin.ee/ahvYrgZ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-forest-600 to-forest-800 text-white rounded-full text-lg font-medium tracking-wide shadow-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-105 border border-forest-400/30 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <span className="relative z-10">設置のご相談はこちら</span>
                        </a>
                    </div>
                </div>
            </ScrollSection>

            <footer className="py-12 text-center text-forest-400/40 text-[10px] tracking-[0.3em] uppercase relative z-10 bottom-0 w-full mix-blend-plus-lighter">
                &copy; 2026 CANDY HOUSE Inc. All Rights Reserved.
            </footer>
        </main>
    )
}

export default App
