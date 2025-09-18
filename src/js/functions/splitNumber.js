export const splitNumber = (enter) =>  {
    if (!enter && isNaN(enter)) return;

    let data = String(enter).split('').reverse();

    if (data.length < 4) return enter;

    return data.reduce((acum, number, i) => {
        if ((i + 1) % 3 === 0) {
            return [...acum, number, ' '];
        } else {
            return [...acum, number];
        }
    }, [])
        .reverse()
        .join('')
        .trim();
};
