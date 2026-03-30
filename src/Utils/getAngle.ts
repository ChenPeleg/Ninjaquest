const getCurrentRotationFixed = (elid: HTMLElement): number => {
    'use strict';
    let angle: number;
    const el = elid;
    const st = window.getComputedStyle(el, null);
    const tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

    if (tr !== "none" && tr !== "fail...") {
        const values = tr.split('(')[1]?.split(')')[0];
        if (values) {
            const valuesArray = values.split(',');
            const a = valuesArray[0];
            const b = valuesArray[1];

            let radians = Math.atan2(parseFloat(b || '0'), parseFloat(a || '0'));
            if (radians < 0) {
                radians += (2 * Math.PI);
            }
            angle = Math.round(radians * (180 / Math.PI));
        } else {
            angle = 0;
        }
    } else {
        angle = 0;
    }

    return angle;
};

export default getCurrentRotationFixed;
