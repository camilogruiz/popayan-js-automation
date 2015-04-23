describe("Popayan.js", function () {

    var popayan;

    // This runs before each "it(...)"
    beforeEach(function () {
        var button = document.createElement('button');
        var counter = document.createElement('span');

        counter.className = 'counter';
        document.body.appendChild(button);
        document.body.appendChild(counter);

        popayan = new POPAYANJS.Counter({
            buttonElement: document.getElementsByTagName('button')[0],
            labelElement: document.getElementsByClassName('counter')[0],
        });
    });

    it("POPAYANJS.Counter should create a new object with the keys: 'count' 'buttonElement' 'labelElement'", function () {
        expect(popayan.count).toBeDefined();
        expect(popayan.buttonElement).toBeDefined();
        expect(popayan.labelElement).toBeDefined();
    });

    it("POPAYANJS.Counter.add() should incremenet 'count' property by 1", function () {
        popayan.add();
        expect(popayan.count).toEqual(1);

        popayan.add();
        expect(popayan.count).toEqual(2);

        popayan.add();
        expect(popayan.count).toEqual(3);

        popayan.add();
        expect(popayan.count).toEqual(4);
    });
});
