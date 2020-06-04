const makeConvertTimeToRatio = (stepStart, duration) => (stepCurrent) =>
    (stepCurrent - stepStart) / duration;

const isRequired = (params) => {
    throw `${params} param is required`;
};

function isNumber(value) {
    return typeof value === "number" && isFinite(value);
}

const limit = (max, min, value) => Math.max(Math.min(max, value), min);

const Animator = (
    obj = isRequired("first"),
    stateEnd = isRequired("second"),
    params = isRequired("third")
) => {
    let accInt = 0;
    let convertTimeToRatio = null;
    let duration = isNumber(params)
        ? params
        : params.duration || isRequired("{duration}");
    let effect = params.effect || ((i) => i);

    let isRunning = true;
    let isCancelled = false;

    let properties = Object.keys(stateEnd).filter((attr) => attr in obj);
    let stateStart = properties.reduce((g, c) => ({ ...g, [c]: obj[c] }), {});

    return {
        progress: 0,
        restart: () => {
            isCancelled = false;
            isRunning = true;
            convertTimeToRatio = null;
        },
        stop: () => {
            isCancelled = true;
            isRunning = true;
            convertTimeToRatio = null;
        },
        update: function (accExt = null) {
            if (isCancelled) return false;

            if (convertTimeToRatio === null) {
                convertTimeToRatio = makeConvertTimeToRatio(accExt, duration);
            }

            accInt = accExt !== null ? accExt : accInt + 1;

            this.progress = limit(1, 0, convertTimeToRatio(accInt));
            let ratioTreated = effect(this.progress);

            properties.map((attr) => {
                obj[attr] =
                    stateStart[attr] +
                    (stateEnd[attr] - stateStart[attr]) * ratioTreated;
            });

            if (this.progress === 1 && isRunning) {
                isRunning = false;
                params.onComplete && params.onComplete();
            }
        }
    };
};

export default Animator;
export { Animator };
