import React from "react";

export function JourneyFooter() {
  return (
    <div className="w-full pointer-events-auto">
      
      {/* ==================================================
          WARM IVORY / PARCHMENT CONVERSION COLUMN — CLEAN EXHALE
          ================================================== */}
      <section className="w-full bg-paper text-espresso px-8 sm:px-16 md:px-24 py-20 sm:py-28 md:py-36 border-t border-stone/10 font-sans">
        <div className="max-w-4xl mx-auto flex flex-col gap-20">
          
          {/* 1. Plain-English Product Definition */}
          <div className="flex flex-col gap-4 max-w-3xl pb-12 border-b border-hairline">
            <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase">
              WHAT IS ALTHEARA?
            </span>
            <p className="font-reading text-2xl sm:text-3xl text-charcoal leading-relaxed">
              Altheara is a private place to capture your life as it happens, reflect on what it means, and understand more of yourself as those moments accumulate. Over time, what you leave there becomes connected stories, yearly Volumes, and a Library of the life you actually lived.
            </p>
          </div>

          {/* 2. The Daily Experience Demonstration */}
          <div className="flex flex-col gap-8 pb-12 border-b border-hairline">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase">
                THE DAILY EXPERIENCE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal font-normal leading-tight">
                HOW ALTHEARA FEELS EACH DAY
              </h2>
            </div>

            {/* Editorial Moment Flow */}
            <div className="p-8 sm:p-10 rounded-sm bg-white border border-hairline shadow-xs flex flex-col gap-6">
              
              {/* Step 1: The Invitation */}
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xs tracking-[0.25em] font-bold text-brass-deep uppercase">
                  1. THE INVITATION
                </span>
                <p className="font-reading text-lg sm:text-xl text-charcoal italic">
                  &ldquo;What happened today that you don&apos;t want to lose?&rdquo;
                </p>
              </div>

              {/* Step 2: The Echo */}
              <div className="p-5 rounded-sm bg-paper border border-hairline/80 flex flex-col gap-2">
                <span className="font-sans text-xs tracking-[0.2em] font-bold text-taupe uppercase">
                  2. YOUR ECHO
                </span>
                <p className="font-reading text-base text-espresso leading-relaxed">
                  &ldquo;Everyone ended up in the kitchen after dinner tonight. Nobody was doing anything special. We just stood around talking longer than usual before everyone went their separate ways.&rdquo;
                </p>
              </div>

              {/* Step 3: The Reflection */}
              <div className="p-5 rounded-sm bg-linen/60 border border-hairline flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-brass-deep uppercase">
                    3. REFLECTION RETURNED
                  </span>
                </div>
                <p className="font-reading text-base text-charcoal leading-relaxed">
                  &ldquo;Nothing about tonight announced itself as important. That&apos;s probably why it would be so easy to forget. But some of the moments we miss most later are the ones we never knew we were supposed to remember.&rdquo;
                </p>
              </div>

              {/* Step 4: Cascade to Library */}
              <div className="pt-4 border-t border-hairline/60 flex flex-col gap-3">
                <span className="font-sans text-xs tracking-[0.25em] font-bold text-taupe uppercase">
                  WHERE THAT MOMENT GOES
                </span>
                <div className="font-display text-sm sm:text-base text-brass-deep tracking-wide flex flex-wrap items-center gap-2 sm:gap-4 font-medium">
                  <span>ECHO</span>
                  <span>&rarr;</span>
                  <span>REFLECTION</span>
                  <span>&rarr;</span>
                  <span>STORY</span>
                  <span>&rarr;</span>
                  <span>VOLUME</span>
                  <span>&rarr;</span>
                  <span>LIBRARY</span>
                </div>
              </div>

            </div>

            <p className="font-display text-xl sm:text-2xl text-charcoal text-center font-normal mt-2">
              A FEW MINUTES TODAY. <span className="text-brass-deep">SOMEWHERE FOR IT TO GO FOREVER.</span>
            </p>
          </div>

          {/* 3. The Core System */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase">
                THE CORE SYSTEM
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-[1.12] tracking-tight">
                A SIMPLE HABIT.<br />A LIFE THAT KEEPS GROWING.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-8 mt-2 border-t border-hairline pt-8">
              {[
                { label: "ECHO", desc: "Capture what is present while it is happening." },
                { label: "REFLECTION", desc: "See something meaningful returned to you." },
                { label: "LENS", desc: "Notice patterns forming across seasons of your life." },
                { label: "STORY", desc: "Watch separate moments begin connecting." },
                { label: "VOLUMES", desc: "Return to the years that shaped you." },
                { label: "LIBRARY", desc: "See what a life becomes when its years have somewhere to live." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 pb-5 border-b border-hairline/60">
                  <span className="font-sans text-xs tracking-[0.25em] font-bold text-brass-deep uppercase">
                    {item.label}
                  </span>
                  <p className="font-reading text-base text-bark leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Category Positioning & Journal Comparison */}
          <div className="flex flex-col gap-10 border-t border-hairline pt-14 sm:pt-18">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase">
                THE CATEGORY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-tight tracking-tight">
                THIS ISN&apos;T ABOUT WRITING MORE.
              </h2>
              <p className="font-reading text-xl sm:text-2xl text-taupe italic mt-1">
                It&apos;s about losing less.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
              {/* Left Column: Traditional Journal */}
              <div className="p-8 bg-linen/60 rounded-sm border border-hairline flex flex-col justify-between">
                <div>
                  <span className="font-sans text-xs tracking-[0.25em] font-bold text-taupe uppercase block mb-4">
                    TRADITIONAL JOURNAL
                  </span>
                  <div className="font-reading text-base sm:text-lg text-bark leading-relaxed flex flex-col gap-3">
                    <p>You write.</p>
                    <p>The pages accumulate.</p>
                    <p>You have to return and make sense of them yourself.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Altheara */}
              <div className="p-8 bg-paper rounded-sm border border-wheat/40 shadow-[0_4px_24px_rgba(201,174,124,0.12)] flex flex-col justify-between">
                <div>
                  <span className="font-sans text-xs tracking-[0.25em] font-bold text-brass-deep uppercase block mb-4">
                    ALTHEARA
                  </span>
                  <div className="font-reading text-base sm:text-lg text-espresso leading-relaxed flex flex-col gap-3">
                    <p>You live.</p>
                    <p>You leave Echoes.</p>
                    <div className="pt-2">
                      <p className="text-sm font-sans text-taupe uppercase tracking-wider mb-2 font-medium">Altheara helps them become:</p>
                      <p className="font-display text-base sm:text-lg text-brass-deep font-normal tracking-wide">
                        Reflection &rarr; Story &rarr; Volume &rarr; Library
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Positioning Line */}
            <div className="mt-2 p-6 sm:p-8 bg-white/70 border border-hairline rounded-sm text-center">
              <p className="font-display text-xl sm:text-2xl text-charcoal font-normal leading-relaxed">
                A journal gives you pages. <span className="text-brass-deep">Altheara gives those pages somewhere to go.</span>
              </p>
            </div>
          </div>

          {/* 3. Emotional & Factual Privacy Commitment */}
          <div className="flex flex-col gap-6 border-t border-hairline pt-14 sm:pt-18 max-w-3xl">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase">
                PRIVACY & OWNERSHIP
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal font-normal leading-tight tracking-tight">
                YOUR LIFE IS NOT CONTENT.
              </h2>
            </div>

            {/* Emotional Promise */}
            <p className="font-reading text-lg sm:text-xl text-espresso leading-relaxed">
              Your reflections are personal. They aren&apos;t advertising inventory, and they aren&apos;t something we sell. Altheara is designed to be a private place for the life you choose to keep here.
            </p>

            {/* Factual Substantiation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-hairline/60 text-xs sm:text-sm text-taupe font-sans">
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-charcoal uppercase tracking-wider text-xs">Zero Public Models</span>
                <p className="font-reading leading-relaxed">Your stories are never used to train public generative models.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-charcoal uppercase tracking-wider text-xs">End-to-End Security</span>
                <p className="font-reading leading-relaxed">Encrypted data storage with redundant backup architectures.</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-charcoal uppercase tracking-wider text-xs">Complete Ownership</span>
                <p className="font-reading leading-relaxed">You own your archive. Export or remove your story at any time.</p>
              </div>
            </div>
          </div>

        </div>
        {/* ==================================================
            PRICING & POST-PRICING NARRATIVE: THE SECRET
            ================================================== */}
        <div className="max-w-5xl mx-auto flex flex-col gap-20 sm:gap-28 w-full">
          
          {/* ==================================================
              SECTION 1 — PRICING INTRODUCTION
              ================================================== */}
          <div id="pricing" className="flex flex-col gap-6 text-center max-w-2xl mx-auto border-t border-hairline pt-20 sm:pt-28">
            <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase">
              CHOOSE HOW YOUR STORY GROWS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-[1.12] tracking-tight">
              START WITH A MOMENT.<br />BUILD SOMETHING THAT LASTS.
            </h2>
            <p className="font-reading text-base sm:text-lg text-bark leading-relaxed mt-1">
              Begin with seven moments for free.<br className="hidden sm:inline" />
              Continue with Altheara as your story grows.<br className="hidden sm:inline" />
              Choose Legacy when you want to preserve even more.
            </p>
          </div>

          {/* ==================================================
              THREE MEMBERSHIP CARDS
              ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
            
            {/* CARD 1 — OPEN ($0) */}
            <div className="bg-paper p-7 sm:p-8 rounded-sm border border-hairline shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative">
              <div className="flex flex-col">
                <div className="h-6 flex items-center justify-between">
                  <span className="font-sans text-xs tracking-[0.25em] font-bold text-taupe uppercase">
                    EXPERIENCE IT
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-charcoal font-normal mt-3">
                  OPEN
                </h3>

                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="font-display text-4xl text-charcoal font-normal">$0</span>
                </div>

                <p className="font-sans text-xs text-taupe mt-1">
                  Experience Altheara before deciding anything.
                </p>

                <div className="mt-3 flex flex-col gap-2 min-h-[92px]">
                  <div>
                    <span className="inline-block bg-linen text-bark font-sans text-xs uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full">
                      YOUR FIRST 7 MOMENTS ARE FREE
                    </span>
                  </div>
                  <p className="font-reading text-sm text-bark leading-relaxed">
                    Start small. See what happens when a few ordinary moments are given somewhere to stay.
                  </p>
                </div>

                <div className="mt-7 mb-6">
                  <button 
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("open-begin-modal"));
                      }
                    }}
                    className="w-full block text-center border border-charcoal/30 text-charcoal font-sans text-xs uppercase tracking-wider font-bold py-3.5 rounded-full hover:bg-stone/5 transition-colors cursor-pointer"
                  >
                    BEGIN &rarr;
                  </button>
                  <span className="block text-center font-sans text-xs text-taupe tracking-wide mt-2">
                    No subscription required.
                  </span>
                </div>

                <div className="border-t border-hairline/80 pt-6">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-taupe uppercase block mb-3">
                    INCLUDED
                  </span>
                  <ul className="font-reading text-sm text-espresso flex flex-col gap-2.5">
                    {[
                      "7 Daily Invitations",
                      "7 Echoes",
                      "7 Personal Reflections",
                      "Private Moment Archive",
                      "1 Story Preview"
                    ].map((feat, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="text-brass-deep font-bold shrink-0">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CARD 2 — ALTHEARA ($12.99 / MO) — PRIMARY ANCHOR */}
            <div className="bg-charcoal text-paper p-7 sm:p-8 rounded-sm border border-espresso shadow-xl flex flex-col justify-between relative lg:scale-[1.03] z-10 hover:shadow-2xl transition-all">
              <div className="flex flex-col">
                <div className="h-6 flex items-center justify-between gap-2">
                  <span className="font-sans text-xs tracking-[0.25em] font-bold text-wheat uppercase">
                    LIVE WITH IT
                  </span>
                  <span className="inline-block bg-wheat/20 border border-wheat/40 text-wheat font-sans text-xs uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full">
                    MOST CHOSEN
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-ivory font-normal mt-3">
                  ALTHEARA
                </h3>

                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="font-display text-4xl text-ivory font-normal">$12.99</span>
                  <span className="font-sans text-xs text-linen/60">/ month</span>
                </div>

                <p className="font-sans text-xs text-linen/60 mt-1">
                  Keep your story growing.
                </p>

                <div className="mt-3 flex flex-col gap-2 min-h-[92px]">
                  <p className="font-reading text-sm text-linen/85 leading-relaxed">
                    The more you leave here, the more Altheara can connect—turning individual moments into an evolving story of your life.
                  </p>
                </div>

                <div className="mt-7 mb-6">
                  <button 
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("open-begin-modal"));
                      }
                    }}
                    className="w-full block text-center bg-paper text-charcoal font-sans text-xs uppercase tracking-wider font-bold py-3.5 rounded-full hover:bg-ivory transition-colors shadow-sm cursor-pointer"
                  >
                    KEEP MY STORY GROWING &rarr;
                  </button>
                  <span className="block text-center font-sans text-xs text-transparent select-none mt-2" aria-hidden="true">
                    &nbsp;
                  </span>
                </div>

                <div className="border-t border-linen/15 pt-6">
                  <span className="font-sans text-xs tracking-[0.2em] font-bold text-wheat uppercase block mb-3">
                    AVAILABLE NOW
                  </span>
                  <ul className="font-reading text-sm text-linen/90 flex flex-col gap-2.5">
                    {[
                      "Everything in Open",
                      "Unlimited Invitations",
                      "Unlimited Echoes",
                      "Unlimited Personal Reflections",
                      "Growing Story & Chapters",
                      "Timeline & Archive",
                      "Digital Library"
                    ].map((feat, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="text-wheat font-bold shrink-0">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Very quiet divider: AS ALTHEARA GROWS */}
                <div className="border-t border-linen/10 pt-5 mt-5">
                  <span className="font-sans text-xs tracking-[0.25em] font-semibold text-linen/50 uppercase block mb-3">
                    AS ALTHEARA GROWS
                  </span>
                  <ul className="font-reading text-sm text-linen/65 flex flex-col gap-2">
                    {[
                      "Altheara Lens™",
                      "Annual Volume",
                      "Volume Studio"
                    ].map((feat, idx) => (
                      <li key={idx} className="flex gap-2.5 items-center text-linen/70">
                        <span className="text-linen/40 text-xs">○</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CARD 3 — LEGACY ($16.99 / MO) */}
            <div className="bg-paper p-7 sm:p-8 rounded-sm border border-wheat/60 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative">
              <div className="flex flex-col">
                <div className="h-6 flex items-center justify-between">
                  <span className="font-sans text-xs tracking-[0.25em] font-bold text-brass-deep uppercase">
                    PRESERVE IT
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-charcoal font-normal mt-3">
                  LEGACY
                </h3>

                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="font-display text-4xl text-charcoal font-normal">$16.99</span>
                  <span className="font-sans text-xs text-taupe">/ month</span>
                </div>

                <p className="font-sans text-xs text-taupe mt-1">
                  Preserve more than the story.
                </p>

                <div className="mt-3 flex flex-col gap-2 min-h-[92px]">
                  <p className="font-reading text-sm text-bark leading-relaxed">
                    For those who want what they keep here to live beyond them.
                  </p>
                </div>

                <div className="mt-7 mb-6">
                  <button 
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("open-begin-modal"));
                      }
                    }}
                    className="w-full block text-center bg-espresso text-paper font-sans text-xs uppercase tracking-wider font-bold py-3.5 rounded-full hover:bg-charcoal transition-colors shadow-sm cursor-pointer"
                  >
                    BUILD MY LEGACY &rarr;
                  </button>
                  <span className="block text-center font-sans text-xs text-taupe tracking-wide mt-2">
                    Includes complete Altheara membership.
                  </span>
                </div>

                <div className="border-t border-hairline/80 pt-6">
                  <span className="font-sans text-xs tracking-[0.25em] font-semibold text-taupe uppercase block mb-3">
                    AS LEGACY GROWS
                  </span>
                  <ul className="font-reading text-sm text-bark flex flex-col gap-2">
                    {[
                      "Legacy Vault™",
                      "Annual Portrait Capture",
                      "Living Portrait™",
                      "Heir Access",
                      "Generational Library™"
                    ].map((feat, idx) => (
                      <li key={idx} className="flex gap-2.5 items-center text-taupe">
                        <span className="text-taupe/60 text-xs">○</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* ==================================================
              SECTION 2 — THE ACCUMULATION
              ================================================== */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-16 sm:py-24 border-t border-hairline">
            <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase mb-4">
              HOW IT BEGINS
            </span>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-charcoal font-normal tracking-tight mb-8">
              IT STARTS SMALL.
            </h2>

            {/* Moment Beats */}
            <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
              <div className="p-6 rounded-sm bg-white border border-hairline shadow-xs w-full text-left">
                <span className="font-sans text-xs tracking-[0.25em] font-bold text-brass-deep uppercase block mb-1">
                  ONE MOMENT.
                </span>
                <p className="font-reading text-base sm:text-lg text-espresso leading-relaxed italic">
                  A few sentences. Something you noticed. Something you don&apos;t want to lose.
                </p>
              </div>

              <div className="font-display text-sm sm:text-base text-taupe uppercase tracking-[0.25em]">
                THEN ANOTHER.
              </div>

              <div className="font-display text-sm sm:text-base text-taupe uppercase tracking-[0.25em]">
                AND ANOTHER.
              </div>

              {/* The synthesis beat */}
              <div className="pt-6 border-t border-hairline/60 flex flex-col items-center gap-3 w-full">
                <h3 className="font-display text-2xl sm:text-3xl text-charcoal font-normal leading-tight">
                  THE PIECES BEGIN TO FIND EACH OTHER.
                </h3>
                <p className="font-reading text-base text-bark">
                  What felt separate begins becoming part of something larger.
                </p>
                <span className="font-display text-xl sm:text-2xl text-brass-deep tracking-wide font-normal mt-1">
                  A STORY.
                </span>
              </div>
            </div>
          </div>

          {/* ==================================================
              SECTION 3 — THE YEAR
              ================================================== */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-12 sm:py-16 border-t border-hairline">
            <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase mb-4">
              OVER TIME
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-tight tracking-tight">
              A YEAR BECOMES<br />SOMETHING YOU CAN RETURN TO.
            </h2>

            <h3 className="font-display text-xl sm:text-2xl text-brass-deep font-normal mt-4">
              YOUR FIRST VOLUME.
            </h3>

            <p className="font-reading text-base sm:text-lg text-bark leading-relaxed mt-3 max-w-lg">
              The moments were small when you lived them.<br />
              Together, they become the story of a year.
            </p>
          </div>

          {/* ==================================================
              SECTION 4 — THE ARTIFACT (PHYSICAL VOLUME)
              ================================================== */}
          <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full py-12 sm:py-16 border-t border-hairline">
            <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto">
              <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase">
                THE ARTIFACT
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-[1.12] tracking-tight">
                YOUR YEAR.<br />MADE PHYSICAL.
              </h2>
              <p className="font-reading text-base sm:text-lg text-bark leading-relaxed mt-1">
                When a year is complete, your Digital Volume can become a beautifully produced physical book made to join the Library of your life.
              </p>
            </div>

            {/* Photographic Spread */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-4">
              <div className="relative rounded-sm overflow-hidden border border-hairline aspect-[4/3] group">
                <img 
                  src="/media_10.jpg" 
                  alt="Altheara Volume I linen book held overlooking a quiet sunset lake"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <span className="font-sans text-xs tracking-wider text-linen/90 uppercase">
                    Linen-bound hardcover keepsake
                  </span>
                </div>
              </div>
              <div className="relative rounded-sm overflow-hidden border border-hairline aspect-[4/3] group">
                <img 
                  src="/media_11.jpg" 
                  alt="Hands opening a linen Altheara book on a rustic table in a sunbeam, showing pages"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <span className="font-sans text-xs tracking-wider text-linen/90 uppercase">
                    Archival acid-free paper &middot; Custom spine embossing
                  </span>
                </div>
              </div>
            </div>

            {/* One Quiet Line */}
            <p className="font-reading text-sm text-taupe italic text-center mt-2">
              Altheara and Legacy members receive preferred pricing on future Printed Volumes.
            </p>
          </div>

          {/* ==================================================
              SECTION 5 — THE LIBRARY
              ================================================== */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-16 sm:py-24 border-t border-hairline">
            <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase mb-6">
              AND THEN ANOTHER YEAR.
            </span>

            {/* Quiet Year Progression */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-display text-xl sm:text-2xl text-taupe mb-10">
              <span className="text-charcoal font-medium">2027</span>
              <span className="text-wheat">&rarr;</span>
              <span className="text-charcoal font-medium">2028</span>
              <span className="text-wheat">&rarr;</span>
              <span className="text-charcoal font-medium">2029</span>
              <span className="text-wheat">&rarr;</span>
              <span>2030</span>
              <span className="text-taupe/40">&middot;</span>
              <span>2031</span>
              <span className="text-taupe/40">&middot;</span>
              <span>2032</span>
              <span className="text-taupe/40">&middot;</span>
              <span>2033 &hellip;</span>
            </div>

            {/* Archival Shelf Image */}
            <div className="w-full max-w-3xl rounded-sm overflow-hidden border border-hairline shadow-md my-4">
              <img 
                src="/media_12.jpg" 
                alt="Row of linen-bound Altheara volumes on a wooden bookshelf"
                className="w-full h-auto object-cover max-h-[380px]"
              />
            </div>

            {/* Reveal Statement with Generous Whitespace */}
            <div className="flex flex-col gap-4 mt-12 mb-4">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-tight tracking-tight">
                ONE YEAR BECOMES A VOLUME.<br />
                YEARS BECOME A LIBRARY.
              </h2>
              <p className="font-display text-2xl sm:text-3xl text-brass-deep font-normal tracking-wide mt-2">
                YOUR LIBRARY.
              </p>
            </div>
          </div>

          {/* ==================================================
              SECTION 6 — THE SECRET
              ================================================== */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-24 sm:py-36 border-t border-hairline">
            <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase mb-12">
              THE LONGER STORY
            </span>

            <div className="flex flex-col gap-10 font-display text-2xl sm:text-3xl md:text-4xl text-charcoal font-normal leading-snug">
              <p>
                THE STRANGE THING IS,
              </p>
              <p className="text-bark">
                YOU NEVER HAD TO<br />
                WRITE YOUR LIFE STORY.
              </p>
              <p>
                YOU JUST KEPT<br />
                LEAVING PIECES OF IT HERE.
              </p>
              <p className="text-brass-deep italic">
                ALTHEARA KEPT THEM TOGETHER.
              </p>
            </div>
          </div>

          {/* ==================================================
              SECTION 7 — TIME
              ================================================== */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-16 sm:py-24 border-t border-hairline">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full items-start">
              {/* TODAY */}
              <div className="flex flex-col gap-2 p-5 rounded-sm bg-white border border-hairline shadow-xs">
                <span className="font-sans text-xs tracking-[0.25em] font-bold text-taupe uppercase">
                  TODAY
                </span>
                <p className="font-display text-xl text-charcoal font-normal">
                  One Echo.
                </p>
              </div>

              {/* ONE YEAR */}
              <div className="flex flex-col gap-2 p-5 rounded-sm bg-white border border-hairline shadow-xs">
                <span className="font-sans text-xs tracking-[0.25em] font-bold text-taupe uppercase">
                  ONE YEAR
                </span>
                <p className="font-display text-xl text-charcoal font-normal">
                  A Volume.
                </p>
              </div>

              {/* TEN YEARS */}
              <div className="flex flex-col gap-2 p-5 rounded-sm bg-paper border border-hairline shadow-xs">
                <span className="font-sans text-xs tracking-[0.25em] font-bold text-brass-deep uppercase">
                  TEN YEARS
                </span>
                <p className="font-display text-xl text-charcoal font-normal">
                  Your Library.
                </p>
              </div>

              {/* A LIFETIME */}
              <div className="flex flex-col gap-2 p-5 rounded-sm bg-paper border border-wheat/60 shadow-xs">
                <span className="font-sans text-xs tracking-[0.25em] font-bold text-brass-deep uppercase">
                  A LIFETIME
                </span>
                <p className="font-display text-xl text-charcoal font-normal">
                  A life kept.
                </p>
              </div>
            </div>

            <p className="font-reading text-base sm:text-lg text-bark italic mt-8">
              &ldquo;Something no one could recreate later.&rdquo;
            </p>

            <p className="font-display text-lg sm:text-xl text-charcoal font-normal mt-8 max-w-xl">
              WHAT BEGINS WITH A FEW MINUTES TODAY<br />
              <span className="text-brass-deep">CAN BECOME DECADES OF A LIFE KEPT.</span>
            </p>
          </div>

          {/* ==================================================
              SECTION 8 — FINAL THESIS
              ================================================== */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-16 sm:py-24 border-t border-hairline">
            <span className="font-sans text-xs tracking-[0.3em] text-taupe font-bold uppercase mb-4">
              THE CORE THESIS
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-tight tracking-tight">
              ALTHEARA BECOMES MORE VALUABLE<br />FOR A SIMPLE REASON:
            </h2>
            
            <p className="font-display text-2xl sm:text-3xl text-brass-deep font-normal tracking-wide mt-3 mb-6">
              IT KNOWS MORE OF THE STORY.
            </p>

            <div className="font-reading text-base sm:text-lg text-bark leading-relaxed flex flex-col gap-2 max-w-lg mx-auto">
              <p>Every Echo adds context.</p>
              <p>Every Reflection adds understanding.</p>
              <p>Every year adds another layer.</p>
              <div className="pt-4 border-t border-hairline/60 mt-2">
                <p className="text-charcoal">
                  What begins as a quiet place for today&apos;s moment can become something no one could recreate later—
                </p>
                <p className="font-display text-xl sm:text-2xl text-brass-deep font-normal mt-2">
                  THE ACCUMULATED STORY OF A LIFE.
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================
              FINAL CONVERSION
              ================================================== */}
          <div className="flex flex-col items-center text-center gap-6 py-20 sm:py-28 border-t border-hairline max-w-2xl mx-auto w-full">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal leading-tight tracking-tight">
              YOU DON&apos;T HAVE TO<br />PRESERVE A LIFETIME TODAY.
            </h2>

            <p className="font-display text-2xl sm:text-3xl text-brass-deep font-normal tracking-wide">
              JUST ONE MOMENT.
            </p>

            <p className="font-reading text-base text-taupe italic -mt-2">
              That&apos;s how every Altheara begins.
            </p>

            <div className="flex flex-col items-center gap-2 mt-4">
              <button 
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-begin-modal"));
                  }
                }}
                className="bg-charcoal text-paper font-sans text-xs uppercase tracking-[0.25em] font-bold px-10 py-4 rounded-full hover:bg-hearth transition-all duration-300 shadow-md cursor-pointer"
              >
                BEGIN YOUR STORY &rarr;
              </button>
              <span className="font-sans text-xs text-taupe tracking-wide mt-2">
                Your first seven moments are free.
              </span>
            </div>

            <div className="mt-16 pt-10 border-t border-hairline/60 flex flex-col items-center gap-1.5">
              <span className="font-sans text-xs tracking-[0.35em] text-charcoal font-bold uppercase">
                ALTHEARA
              </span>
              <span className="font-reading text-sm text-brass-deep italic">
                The place where a life is kept.
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          STANDARD FOOTER LINKS BLOCK (Charcoal)
          ================================================== */}
      <footer className="w-full bg-night text-linen/60 border-t border-stone/15 py-12 md:py-20 px-8 sm:px-16 md:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col">
            <span className="font-sans text-sm tracking-[0.3em] text-ivory font-bold">
              ALTHEARA
            </span>
            <span className="font-reading text-xs text-wheat italic mt-1">
              A place for your life.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone font-bold mb-1">
                Journey
              </span>
              <a href="#experience" className="font-sans text-xs hover:text-ivory transition-colors">Experience</a>
              <a href="#grows" className="font-sans text-xs hover:text-ivory transition-colors">How It Grows</a>
              <a href="#artifact" className="font-sans text-xs hover:text-ivory transition-colors">The Artifact</a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone font-bold mb-1">
                Company
              </span>
              <a href="#about" className="font-sans text-xs hover:text-ivory transition-colors">Why Altheara</a>
              <a href="#pricing" className="font-sans text-xs hover:text-ivory transition-colors">Pricing</a>
              <a href="#signin" className="font-sans text-xs hover:text-ivory transition-colors">Sign In</a>
            </div>

            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone font-bold mb-1">
                Legal
              </span>
              <a href="#privacy" className="font-sans text-xs hover:text-ivory transition-colors">Privacy Policy</a>
              <a href="#terms" className="font-sans text-xs hover:text-ivory transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto h-px bg-stone/10 my-10" />

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans uppercase tracking-[0.15em] text-stone">
          <span>&copy; {new Date().getFullYear()} Altheara. All rights reserved.</span>
          <span>Crafted with care.</span>
        </div>
      </footer>

    </div>
  );
}
