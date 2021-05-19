import { useEffect } from "react";
import { useRouter } from 'next/router';

interface RedirectProps {
    url: string;
}
function Redirect({ url }: RedirectProps) {
    const router = useRouter();
    useEffect(() => {
        router.push(url);
    }, [])

    return <></>
}

export default Redirect;