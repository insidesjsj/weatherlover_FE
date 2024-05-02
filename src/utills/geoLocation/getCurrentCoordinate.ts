export interface LamcParameter {
    Re: number;
    grid: number;
    slat1: number;
    slat2: number;
    olon: number;
    olat: number;
    xo: number;
    yo: number;
    first: number;
}

const lamcConversion = (lon: number, lat: number, map: LamcParameter) => {
    const DEGRAD = Math.PI / 180.0;

    const re = map.Re / map.grid;
    const slat1 = map.slat1 * DEGRAD;
    const slat2 = map.slat2 * DEGRAD;
    const olon = map.olon * DEGRAD;
    const olat = map.olat * DEGRAD;

    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = re * sf / Math.pow(ro, sn);

    let rs: any = {};

    rs['lon'] = lon;
    rs['lat'] = lat;

    let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    ra = re * sf / Math.pow(ra, sn);

    let theta = lon * DEGRAD - olon;

    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs['x'] = Math.floor(ra * Math.sin(theta) + map.xo + 0.5);
    rs['y'] = Math.floor(ro - ra * Math.cos(theta) + map.yo + 0.5);

    return rs;
};

export const getCoordinate = (lat: number, lng: number) => {
    const map: LamcParameter = {
        Re: 6371.00877,
        grid: 5.0,
        slat1: 30.0,
        slat2: 60.0,
        olon: 126.0,
        olat: 38.0,
        xo: 43,
        yo: 136,
        first: 0,
    }

    const result = lamcConversion(lng || 0, lat || 0, map)
    const nx = result['x'].toString()
    const ny = result['y'].toString()

    return { nx, ny }
}