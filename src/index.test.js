import Package from "./index";

describe("Start", () => {
    it("First import right", () => {
        expect(typeof Package).toBe("function");
    });

    it("Required functions", () => {
        const instance = Package();
        expect(instance).toHaveProperty("property");
    });

    it("Launched", () => {
        const instance = Package();
    });
});
