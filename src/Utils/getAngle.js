const getCurrentRotationFixed = (elid) => { // or element
    'use strict';
    var angle;
    // var isElm = elid instanceof HTMLElement ? true : false
    var el = elid;
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

    if (tr !== "none") {


        var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];


        var radians = Math.atan2(b, a);
        if (radians < 0) {
            radians += (2 * Math.PI);
        }
        angle = Math.round(radians * (180 / Math.PI));
        /**/

    } else {
        angle = 0;
    }

    // works!
    return angle;
};

export default getCurrentRotationFixed