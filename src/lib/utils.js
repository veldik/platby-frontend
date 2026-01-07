export function declension(count, one, few, many) {
    if (count === 1) {
        return one;
    } else if (count >= 2 && count <= 4) {
        return few;
    } else {
        return many;
    }
}

