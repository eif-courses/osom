const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const fetch = require('node-fetch');
let temp;
const url = 'https://vikoeif.edupage.org/rpr/server/maindbi.js?__func=mainDBIAccessor';
const data = {
    "__args": [null, 2019, {"vt_filter": {"datefrom": "2020-04-20", "dateto": "2020-04-26"}}, {
        "op": "fetch",
        "tables": [],
        "columns": [],
        "needed_part": {
            "teachers": ["__name", "cb_hidden", "expired", "firstname", "lastname", "short"],
            "classes": ["__name"],
            "classrooms": ["__name", "name", "short"],
            "igroups": ["__name"],
            "students": ["__name", "classid"],
            "subjects": ["__name", "name", "short"],
            "events": ["typ", "name"],
            "event_types": ["name"],
            "subst_absents": ["date", "absent_typeid", "groupname"],
            "periods": ["__name", "period", "starttime", "endtime"],
            "dayparts": ["starttime", "endtime"],
            "dates": ["tt_num", "tt_day"]
        },
        "needed_combos": {},
        "client_filter": {},
        "info_tables": [],
        "info_columns": [],
        "has_columns": {}
    }], "__gsh": "b2f91e6c"
};

//data = "";

const otherParam = {
    headers: {
        'Cookie': '__utmv=182002547.edupage16; __utmz=182002547.1587789999.2.2.utmcsr=stendas.github.io|utmccn=(referral)|utmcmd=referral|utmcct=/; PHPSESSID=ed8a9a4512c2395eb15e711914276f95; __utma=182002547.140737292.1587763868.1587789999.1587827560.3; __utmb=182002547.0.10.1587827560; __utmc=182002547',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    method: "POST"
};

fetch(url, otherParam)
    .then(res => res.json())
    .then(d => {
        const duom = JSON.stringify(d);

        const matched = duom.match(/}],"data_rows":\[[\w\W]*?false}],"data_columns"/gm);

        const slicedText = matched.toString().replace('}],"data_rows":\[', "[").replace('],"data_columns"', "]").replace("\'", "\"");

        const parsedText = JSON.stringify(slicedText);

        console.log(JSON.parse(parsedText));

        temp = parsedText;
    })
    .catch(error => console.log(error));


exports.osomteacher = functions.https.onRequest((request, response) => {
 response.send(JSON.parse(temp));
});