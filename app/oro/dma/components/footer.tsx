import Image from "next/image";

export default function Footer() {
    return (
        <div className="bg-[#D3CAC0] py-[80px]">
            <footer className="container mx-auto sm:px-4 lg:w-[1080px] w-auto flex flex-col lg:flex-row items-center justify-between  lg:gap-0">
                <div className="font-normal font-raleway text-[14px] text-[#07242C] hidden lg:block">
                    <p>
                        Copyright © O Resgate Dos Otimistas.
                    </p>
                    <p>
                        Todos os direitos reservados.
                    </p>
                </div>
                <Image
                    src="/images/oro/v4/logo_alianca_clara.png"
                    alt="Logomarca Aliança Divergente"
                    width={250}
                    height={32}
                    priority
                    className="object-contain"
                />

                <div className="font-normal font-raleway text-[14px] text-[#07242C] text-center lg:hidden block">
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
