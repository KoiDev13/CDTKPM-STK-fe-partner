export  function checkPassword (password) {
    if(/[A-Z]/g.test(password) && /[a-z]/g.test(password) && /[0-9]/g.test(password)) {
        return true;
    }
    return false;
}

export function checkWinRate (winRate) {
    if (parseInt(winRate,10) >= 1 && parseInt(winRate,10) <= 100 ) {
        return true;
    }
    return false;
}