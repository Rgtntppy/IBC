import { useRef, useEffect } from "react";

export function useSyncScroll() {
    const amRef = useRef<HTMLDivElement>(null);
    const pmRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const am = amRef.current;
        const pm = pmRef.current;
        if (!am || !pm) return;

        let isSyncing = false;

        const syncScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
            if (isSyncing) return;
            isSyncing = true;
            target.scrollLeft = source.scrollLeft;
            isSyncing = false;
        };

        const onAmScroll = () => am && pm && syncScroll(am, pm);
        const onPmScroll = () => am && pm && syncScroll(pm, am);

        am.addEventListener('scroll', onAmScroll);
        pm.addEventListener('scroll', onPmScroll);

        return () => {
            am.removeEventListener('scroll', onAmScroll);
            pm.removeEventListener('scroll', onPmScroll);
        };
    }, []);

    return { amRef, pmRef };
};