import Image from "next/image";

export default function Footer() {
    return (
        <div className="bg-[#071117] bg-[radial-gradient(50%_75.08%_at_50%_100.2%,_rgba(16,68,72,0.5)_0%,_rgba(16,68,72,0.2)_34.73%,_rgba(16,68,72,0)_100%)] py-[100px]">
            <footer className="container mx-auto sm:px-4 lg:w-[1080px] w-auto flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-0">
                <div className="font-normal font-raleway text-[14px] text-white hidden lg:block">
                    <p>
                        Copyright © O Resgate Dos Otimistas.
                    </p>
                    <p>
                        Todos os direitos reservados.
                    </p>
                </div>
                <Image
                    src="/images//v21/logo-alianca-divergente.png"
                    alt="Logomarca Aliança Divergente"
                    width={250}
                    height={32}
                    priority
                    className="object-contain"
                />

                <div className="font-normal font-raleway text-[14px] text-white text-center lg:hidden block">
                    <p>
                        Copyright © O Resgate Dos Otimistas.
                    </p>
                    <p>
                        Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    )
}
