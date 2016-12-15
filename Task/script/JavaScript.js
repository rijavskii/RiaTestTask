var bedroom = [{
    name: 'Стіна вітальні',
    elements: [
        {
            name: 'Електропроводка',
            elements: [
                {
                    name: 'Розетка біля ліжка',
                    color: 'Red',
                    path: [
                        { x: 0, y: 250 },
                        { x: 500, y: 250 },
                        { x: 500, y: 45 },
                        { x: 510, y: 45 },
                        { x: 510, y: 250 },
                        { x: 700, y: 250 },
                    ]
                },
                {
                    name: 'Вимикач',
                    color: 'Red',
                    path: [
                        { x: 700, y: 100 },
                        { x: 650, y: 100 },
                        { x: 650, y: 90 },
                        { x: 700, y: 90 },
                    ]
                }
            ]
        },
        {
            name: 'Труби опалення',
            color: 'Yellow',
            path: [
                { x: 0, y: 15 },
                { x: 600, y: 15 },
                { x: 600, y: 0 }
            ]
        },
        {
            name: 'Антени',
            elements: [
                {
                    name: 'Антена супутникова',
                    color: 'green',
                    path: [
                        { x: 0, y: 5 },
                        { x: 100, y: 5 },
                        { x: 460, y: 45 }
                    ]
                },
                {
                    name: 'Антена ефірного телебачення',
                    color: 'green',
                    path: [
                        { x: 260, y: 300 },
                        { x: 480, y: 45 }
                    ]
                }
            ]
        }
    ]
}];

function convertTreeToArray(tree, arr) {
    if (tree && tree.length && tree.length > 0) {
        for (var i = 0; i < tree.length; i++) {
            var o = tree[i];

            if (o && o.path && o.path.length && o.path.length > 0) {
                arr.push(o);
            }
            convertTreeToArray(o.elements, arr);
        }
    }
}

function findCrossElements(arr) {

    var crossedParts = [];

    for (var i = 0; i < arr.length - 1; i++) {
        var el1 = arr[i];

        for (var j = i + 1; j < arr.length; j++) {
            var el2 = arr[j];

            if (isElementsCrossed(el1, el2))

                crossedParts.push(format(el1, el2));
        }
    }

    return crossedParts;
}

function format(el1, el2) {
   
    return el1.name + ' перетинає ' + el2.name;
}

function isLineCrossed(l1, l2) {
     
    //search veсtor of each point we have
    var v1 = (l2[1].x - l2[0].x) * (l1[0].y - l2[0].y) - (l2[1].y - l2[0].y) * (l1[0].x - l2[0].x);
    var v2 = (l2[1].x - l2[0].x) * (l1[1].y - l2[0].y) - (l2[1].y - l2[0].y) * (l1[1].x - l2[0].x);
    var v3 = (l1[1].x - l1[0].x) * (l2[0].y - l1[0].y) - (l1[1].y - l1[0].y) * (l2[0].x - l1[0].x);
    var v4 = (l1[1].x - l1[0].x) * (l2[1].y - l1[0].y) - (l1[1].y - l1[0].y) * (l2[1].x - l1[0].x);

    return ((v1 * v2 <= 0) && (v3 * v4 <= 0));
}

function isElementsCrossed(el1, el2) {

    var isCrossed = false;

    for (var i = 0; i < el1.path.length; i++) {
        var line1 = [];

        if (i + 1 !== el1.path.length) {
            line1 = line1.concat(el1.path[i], el1.path[i + 1]);

            for (var j = 0; j < el2.path.length; j++) {
                var line2 = [];

                if (j + 1 !== el2.path.length) {
                    line2 = line2.concat(el2.path[j], el2.path[j + 1]);

                    if (isLineCrossed(line1, line2)) {
                        isCrossed = true;
                        break;
                    }
                } else
                    break;
            }
        } else
            break;


        if (isCrossed)
            break;
    }

    return isCrossed;
}

function printCrossed(arr) {
    
    for ( var val of arr) {
        console.log(val + '\n');
    }
}
 
function detectIntersection(tree) {

    var arr = [];
    convertTreeToArray(tree, arr);

    var crossed = findCrossElements(arr);

    printCrossed(crossed);
}


detectIntersection(bedroom);