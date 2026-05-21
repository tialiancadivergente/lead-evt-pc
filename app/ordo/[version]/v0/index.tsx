"use client";

import React from "react";
import Image from "next/image";

export default function Formv0() {
  return (
    <div>
      <section
        id="hero"
        className={`relative min-h-screen flex flex-col items-center px-4 md:px-0 justify-between overflow-hidden bg-gradient-to-r from-[#000000] via-[#07242c] to-[#000000] z-0`}
      >
        {/* Background com overlay */}
        <div className="absolute inset-0 bg-[url('/images/paper-texture.png')] bg-cover bg-center opacity-15"></div>

        <div className="absolute bottom-60 left-0 hidden md:block w-[200px] h-[200px] bg-no-repeat">
          <Image
            src="/images/bg-left.png"
            alt="Background top right and left"
            width={80}
            height={200}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute bottom-[500px] hidden md:block right-0 w-[150px] h-[200px] bg-no-repeat">
          <Image
            src="/images/bg-right-bottom.png"
            alt="Background top right and left"
            width={150}
            height={200}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-no-repeat hidden md:block">
          <Image
            src="/images/bg-top-right.png"
            alt="Background top right and left"
            width={400}
            height={200}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-no-repeat show md:hidden">
          <Image
            src="/images/bg-top-right.png"
            alt="Background top right and left"
            width={200}
            height={200}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-[500px] h-[200px] bg-no-repeat show md:hidden">
          <Image
            src="/images/bg-top-left.png"
            alt="Background top right and left"
            width={300}
            height={400}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-[500px] h-[200px] bg-no-repeat hidden md:block">
          <Image
            src="/images/bg-top-left.png"
            alt="Background top right and left"
            width={900}
            height={400}
            priority
            className="object-contain"
            style={{
              transformOrigin: "center",
            }}
          />
        </div>

        <div className="mt-32 flex justify-center">
          <Image
            src="/images/logo-resgate-dos-otimistas.png"
            alt="Logotipo Resgate dos otimistas"
            width={322}
            height={171}
            priority
            className="object-contain select-none pointer-events-none"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="text-[#f4f0e1] text-4xl md:text-5xl font-bold mb-32 text-center">
          EDIÇÃO ENCERRADA!
        </div>
        <footer className="w-full max-w-3xl mx-auto">
          <div className="w-full mb-6">
            <div
              className="border-t border-[#2a4447] w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, #2a4447, transparent)",
              }}
            ></div>
          </div>
          <div className="text-center text-[#f4f0e1] text-xs md:text-sm font-serif tracking-wide pb-6">
            <div className={`text-[#f4f0e1]`}>
              COPYRIGHT © 2025. O RESGATE DOS OTIMISTAS.
            </div>
            <div className={`text-[#f4f0e1]`}>
              TODOS OS DIREITOS RESERVADOS.
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
