import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-8 font-kalam animate-march">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16 relative mt-10">
          <div className="corner-decoration corner-decoration-tl" />
          <div className="corner-decoration corner-decoration-tr" />
          <h1 className="risk-title text-7xl mb-6 relative tracking-[.5em]">
            TABLETOP
          </h1>
          <p className="text-2xl text-[#8B0000] font-bold tracking-wide">
            The world's first board game hackathon
          </p>
          <p className="text-xl text-[#0066cc] mt-10 font-bold tracking-wide">
            New York City // March 15-16 // 2025
          </p>
          <div className="corner-decoration corner-decoration-bl" />
          <div className="corner-decoration corner-decoration-br" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="risk-card military-border">
            <div className="shine"></div>
            <h2 className="text-3xl font-bold text-[#8B0000] mb-4 flex items-center">
              <span className="mr-3">🎲</span>
              CREATE
            </h2>
            <p className="text-sm leading-relaxed">
              Join fellow creatives for an exciting 48-hour journey to design 
              innovative board games. Transform your ideas into playable experiences!
            </p>
          </div>

          <div className="risk-card military-border">
            <div className="shine"></div>
            <h2 className="text-3xl font-bold text-[#4B5320] mb-4 flex items-center">
              <span className="mr-3">✨</span>
              DISCOVER
            </h2>
            <ul className="text-xl space-y-3">
              <li className="flex items-center">
                <span className="mr-3">🎨</span>
                Premium Design Materials
              </li>
              <li className="flex items-center">
                <span className="mr-3">👥</span>
                Creative Workshops
              </li>
              <li className="flex items-center">
                <span className="mr-3">🌟</span>
                Expert Guidance
              </li>
              <li className="flex items-center">
                <span className="mr-3">🏆</span>
                Amazing Prizes
              </li>
            </ul>
          </div>

          <div className="risk-card military-border">
            <div className="shine"></div>
            <h2 className="text-3xl font-bold text-[#D4AF37] mb-4 flex items-center">
              <span className="mr-3">🚀</span>
              LAUNCH
            </h2>
            <div className="text-xl">
              Winners Receive:
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Publishing Partnership</li>
                <li>Marketing Support</li>
                <li>Cash Prizes</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="risk-card military-border p-8 mb-16">
          <h2 className="text-3xl font-bold text-[#8B0000] mb-8 text-center">
            WEEKEND SCHEDULE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="territory-card infantry">
              <div className="shine"></div>
              <h3 className="text-2xl font-bold flex items-center mb-6">
                <span className="mr-3">🌅</span>
                DAY ONE
              </h3>
              <div className="space-y-4">
                <p className="flex items-center text-xl">
                  <span className="mr-3">☀️</span>
                  10:00 - Welcome & Kickoff
                </p>
                <p className="flex items-center text-xl">
                  <span className="mr-3">💡</span>
                  10:30 - Team Formation
                </p>
                <p className="flex items-center text-xl">
                  <span className="mr-3">✍️</span>
                  10:30 - Design Sprint
                </p>
                <p className="flex items-center text-xl">
                  <span className="mr-3">🍽️</span>
                  12:00 - Lunch Break
                </p>
                <p className="flex items-center text-xl">
                  <span className="mr-3">💡</span>
                  12:30 - Design Sprint
                </p>
                <p className="flex items-center text-xl">
                  <span className="mr-3">🌌</span>
                  6:00 -  End of Day 1
                </p>
              </div>
            </div>
            <div className="territory-card cavalry">
              <div className="shine"></div>
              <h3 className="text-2xl font-bold flex items-center mb-6">
                <span className="mr-3">🌄</span>
                DAY TWO
              </h3>
              <div className="space-y-4">
                <p className="flex items-center text-xl">
                  <span className="mr-3">🎮</span>
                  11:00 - Playtesting
                </p>
                <p className="flex items-center text-xl">
                  <span className="mr-3">🍽️</span>
                  12:00 - Lunch Break
                </p>
                <p className="flex items-center text-xl">
                  <span className="mr-3">🎨</span>
                  12:30 - Playtesting
                </p>
                <p className="flex items-center text-xl">
                  <span className="mr-3">🎉</span>
                  15:00 - Showcase & Awards
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <button className="dice-button group">
            <div className="dice animate-roll">
              <div className="dice-face">
                <div className="dice-dot"></div>
              </div>
              <div className="dice-face" style={{ transform: 'rotateY(180deg)' }}>
                <div className="grid grid-cols-2 gap-1 p-1">
                  <div className="dice-dot"></div>
                  <div className="dice-dot"></div>
                </div>
              </div>
              <div className="dice-face" style={{ transform: 'rotateY(90deg)' }}>
                <div className="grid grid-cols-2 gap-1 p-1">
                  <div className="dice-dot"></div>
                  <div className="dice-dot"></div>
                  <div className="dice-dot"></div>
                </div>
              </div>
            </div>
            <span className="inline-block translate-x-4">
              JOIN THE ADVENTURE
            </span>
          </button>
        </section>
      </div>
    </main>
  );
} 