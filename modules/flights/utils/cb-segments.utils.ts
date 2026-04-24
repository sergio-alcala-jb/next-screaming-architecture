
export const getAnnotatedSegments = (segments: string[]) => {
    return segments.map((segment) => {
        const [from, to] = segment.split('→').map((s) => s.trim());
        return { from, to };
    });
};