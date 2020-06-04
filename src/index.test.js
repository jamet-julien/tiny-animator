import Animator from "./index";

describe("Start", () => {
    it("First import right", () => {
        expect(typeof Animator).toBe("function");
    });

    it("Required functions", () => {
        const instance = Animator({ x: 0 }, { x: 10 }, { duration: 10 });
        expect(instance).toHaveProperty("restart");
        expect(instance).toHaveProperty("stop");
        expect(instance).toHaveProperty("update");
    });

    it("Target attribute", () => {
        let obj = { x: 0 };
        const instance = Animator(obj, { size: 10 }, { duration: 10 });
        instance.update(0);
        expect(obj).toHaveProperty("x");
        expect(obj).not.toHaveProperty("size");
    });

    it("Launched", () => {
        let obj = { x: 0 };
        const instance = Animator(obj, { x: 10 }, { duration: 10 });
        instance.update(0);
        expect(obj.x).toBe(0);

        instance.update(5);
        expect(obj.x).toBe(5);

        instance.update(10);
        expect(obj.x).toBe(10);
    });

    it("Start time", () => {
        let obj = { x: 0 };
        const instance = Animator(obj, { x: 10 }, { duration: 10 });
        instance.update(100);
        expect(obj.x).toBe(0);

        instance.update(105);
        expect(obj.x).toBe(5);

        instance.update(110);
        expect(obj.x).toBe(10);
    });

    it("Change scale time", () => {
        let item = { x: 0 };
        const animate = Animator(item, { x: 100 }, { duration: 20 });
        animate.update(0);
        expect(item.x).toBe(0);

        animate.update(10);
        expect(item.x).toBe(50);

        animate.update(20);
        expect(item.x).toBe(100);
    });

    it("test over time", () => {
        let item = { x: 0 };
        const animate = Animator(item, { x: 100 }, { duration: 20 });
        animate.update(0);
        animate.update(40);
        expect(item.x).toBe(100);
    });

    it("stop and restart", () => {
        let item = { x: 0 };
        const animate = Animator(item, { x: 100 }, { duration: 20 });
        animate.update(0);
        expect(item.x).toBe(0);

        animate.update(10);
        expect(item.x).toBe(50);

        animate.stop();
        animate.update(20);
        expect(item.x).toBe(50);

        animate.restart();
        animate.update(20);
        expect(item.x).toBe(0);

        animate.update(40);
        expect(item.x).toBe(100);
    });

    it("Effect params (reverse) ", () => {
        let item = { x: 0 };
        const animate = Animator(
            item,
            { x: 10 },
            { duration: 10, effect: (i) => 1 - i }
        );
        animate.update(0);
        expect(item.x).toBe(10);

        animate.update(10);
        expect(item.x).toBe(0);
    });

    it("onComplete params called", () => {
        let item = { x: 0 };
        let text = "start";
        const onComplete = jest.fn();

        const animate = Animator(item, { x: 10 }, { duration: 10, onComplete });
        animate.update(0);
        animate.update(5);
        expect(onComplete).not.toHaveBeenCalled();

        animate.update(10);
        animate.update(20);
        expect(onComplete).toHaveBeenCalledTimes(1);
    });
});
