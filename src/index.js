const Animator = (
    obj = {},
    stateEnd = {},
    { duration = Infinity, effect = (i) => i, onComplete = () => {} }
) => {
    let timeStart = null;
    let isRunning = true;
    let isCancelled = false;
    let steps = 0;

    let properties = Object.keys(stateEnd).filter((attr) => attr in obj);
    let stateStart = properties.reduce((g, c) => ({ ...g, [c]: obj[c] }), {});

    return {
        restart: () => {
            isCancelled = false;
            isRunning = true;
            timeStart = null;
        },
        stop: () => {
            isCancelled = true;
            isRunning = true;
            timeStart = null;
        },
        update: (timeCurrent = null) => {
            if (isCancelled) return false;

            if (timeStart === null) {
                timeStart = timeCurrent || 0;
            }

            steps = timeCurrent !== null ? timeCurrent : steps + 1;

            let time = Math.min(1, (steps - timeStart) / duration);

            let value = effect(time);
            properties.map((attr) => {
                obj[attr] =
                    stateStart[attr] +
                    (stateEnd[attr] - stateStart[attr]) * value;
            });

            if (time === 1 && isRunning) {
                isRunning = false;
                onComplete && onComplete();
            }
        }
    };
};

export default Animator;
export { Animator };
