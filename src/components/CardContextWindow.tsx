// ssr component for showing the type of sport place in the card

export function CardContextWindow(name: string | undefined | null) {

if (!name) {
    return null;
}
    return (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">{name}</span>);
}

