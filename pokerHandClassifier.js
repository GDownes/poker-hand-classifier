const readFile = (path) => {
    return new Promise((resolve, reject) => {
        require('fs').readFile(path, (error, data) => {
            if (error) reject(error);
            else resolve(data.toString())
        });
    });
};

readFile(process.argv[2])
    .then((input) => {
        input
            .split('\r\n')
            .map(hand => console.log(`${hand} => ${classify(hand)}`));
    })
    .catch(() => {
        console.error('File read error');
    });

const classify = (hand) => {
    const cards = hand.split(' ');
    const ranks = getSortedRanks(cards);
    const distinctRanks = new Set(ranks);
    const firstRank = ranks[0];
    const lastRank = ranks[4];

    switch (distinctRanks.size) {
        case 5:
            if (lastRank === 'A' && firstRank === 'T')
                return isFlush ?
                    "Royal Flush"
                    : "Straight";
            if (cardRanks.indexOf(lastRank) - cardRanks.indexOf(firstRank) === 4)
                return isFlush
                    ? "Straight flush"
                    : "Straight";
            if (lastRank === 'A' && isSecondLastRank5(distinctRanks))
                return isFlush
                    ? "Straight flush"
                    : "Straight";
            return isFlush
                ? "Flush"
                : "High Card";
        case 4:
            return "One pair";
        case 3:
            return getRankOccurrenceCount(ranks, firstRank) === 2
                ? "Two pair"
                : "Three of a kind";
        default:
            return getRankOccurrenceCount(ranks, firstRank) === 3
            || getRankOccurrenceCount(ranks, lastRank) === 3
                ? "Full house"
                : "Four of a kind";
    }
};

const cardRanks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const getSortedRanks = (cards) => {
    return cards
        .map(card => card[0])
        .sort((left, right) => {
            return cardRanks.indexOf(left) - cardRanks.indexOf(right);
        });
};

const getRankOccurrenceCount = (ranks, find) => {
    return ranks.filter(rank => rank === find).length
};

const isFlush = (cards) => {
    return new Set(cards
        .map(card => card[1])
        .sort((left, right) => {
            return left !== right ? left < right ? -1 : 1 : 0
        })).size === 1;
};

const isSecondLastRank5 = (distinctRanks) => {
    return Array.from(distinctRanks)[distinctRanks.size - 2] === '5';
};