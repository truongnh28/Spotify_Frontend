export const convertToMinuteAndSecond = (seconds: number) => {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);

    let hDisplay = h > 0 ? h + ":" : "";
    let mDisplay = m > 0 ? m + ":" : "";
    let sDisplay = s > 0 ? (s < 10 ? `0${s}`: s) : "";
    return hDisplay + mDisplay + sDisplay;
}