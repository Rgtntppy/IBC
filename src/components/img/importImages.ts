export const importAll = (r: __WebpackModuleApi.RequireContext): Record<string, string> => {
    const images: Record<string, string> = {};
    r.keys().forEach((key) => {
        const module = r(key);
        images[key.replace('./', '')] = module.default || module;
    });
    return images;
};