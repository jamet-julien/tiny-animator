import Animator from "./index";

describe("Start", () => {
    it("First import right", () => {
        expect(typeof Animator).toBe("function");
    });

    it("Required functions", () => {
        const instance = Animator({}, {}, {});
        expect(instance).toHaveProperty("restart");
        expect(instance).toHaveProperty("stop");
        expect(instance).toHaveProperty("update");
    });

    it("Launched", () => {
        const instance = Animator();
    });
});
