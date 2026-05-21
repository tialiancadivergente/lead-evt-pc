import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-[#917E5A] py-[100px]">
            <footer className="container mx-auto sm:px-4 lg:w-[1080px] w-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 relative">

                <div className="font-normal font-raleway text-[14px] text-white hidden lg:block">
                    <p>
                        Copyright © O Resgate Dos Otimistas.
                    </p>
                    <p>
                        Todos os direitos reservados.
                    </p>
                </div>

                <Image
                    src="/images/oro/v2/logo.webp"
                    alt="Logomarca Aliança Divergente"
                    width={250}
                    height={32}
                    priority
                    className="object-contain lg:absolute lg:left-1/2 lg:-translate-x-1/2"
                />

                <div className="font-normal font-raleway text-[14px] text-white hidden lg:block text-right">
                    <p>
                        <Link href="https://www.oresgatedosotimistas.com.br/politica-de-privacidade">
                            Política de Privacidade
                        </Link>
                    </p>

                    <p>
                        <Link href="https://www.oresgatedosotimistas.com.br/termos-de-uso">
                            Termos de uso
                        </Link>
                    </p>
                </div>

                <div className="font-normal font-raleway text-[14px] text-white text-center lg:hidden block">
                    <p>
                        Copyright © O Resgate Dos Otimistas.
                    </p>

                    <p>
                        Todos os direitos reservados.
                    </p>

                    <div className="mt-4">
                        <p>
                            <Link href="https://www.oresgatedosotimistas.com.br/politica-de-privacidade">
                                Política de Privacidade
                            </Link>
                        </p>

                        <p>
                            <Link href="https://www.oresgatedosotimistas.com.br/termos-de-uso">
                                Termos de uso
                            </Link>
                        </p>
                    </div>
                </div>

            </footer>
        </div>
    )
}