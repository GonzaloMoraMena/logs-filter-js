import json from "./downloaded-logs-20221102-193827.json" assert {type: "json"}
import * as fs from 'fs';

const file = 'result';

const data = json.filter(x => x['jsonPayload']['published'])
    .map(x => x['jsonPayload']['published'].data)
    .flatMap(x => x.data);

const getReferenceValue = (referencesValue = []) => {
    return referencesValue.map(value => data.find(x => x['referenceValue'] === value));
}


const writeFile = (dataJson, nameFile) => {
    const jsonData = JSON.stringify({
        "channel": "massive-service",
        data: dataJson
    }, null, 2);

    fs.writeFile(`./${nameFile}.json`, jsonData, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

const writeAllData = () => {
    writeFile(data, `${file}-all-request`);
};

const writeErrorData = () => {
    writeFile(getReferenceValue(['1']), `${file}-error-request`);
};

const writeSuccessData = () => {
    writeFile(getReferenceValue(['1']), `${file}-success-request`);
};

(() => {
    writeAllData();
    //writeErrorData();
    //writeSuccessData();

})()