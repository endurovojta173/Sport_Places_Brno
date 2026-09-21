export const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Chyba při stahování dat");
    return res.json();
};