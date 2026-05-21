"use client";

import { useEffect } from "react";

const AliancaTrackingScript = () => {
    useEffect(() => {
        const head = document.head;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://hy.aliancadivergente.com.br/v1/lst/universal-script?ph=76173144eb3caf459268781a7628d524934186324c52a42d6e8dce0fd6982bcf&tag=!clicked&ref_url=" + encodeURI(document.URL);
        head.appendChild(script);

        // Cleanup: remove o script quando o componente for desmontado
        return () => {
            if (head.contains(script)) {
                head.removeChild(script);
            }
        };
    }, []);

    return null; // Esse componente não precisa renderizar nada
};

export default AliancaTrackingScript;
