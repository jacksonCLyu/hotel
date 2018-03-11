
import XLSX from 'xlsx'
var getExcelData = (function () {
    var sab = function (wb) {
        var buf = new ArrayBuffer(wb.length);
        var view = new Uint8Array(buf);
        for (var i = 0, j = wb.length; i < j; ++i) {
            view[i] = wb.charCodeAt(i) & 0xFF;
        };
        return buf;
    };
    var parseData = (function () {
        var dateNum = function (v, date1904) {
            if (date1904) {
                v += 1462;
            };
            var epoch = Date.parse(v);
            return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        };
        return function (data) {
            var ws = {};
            var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
            for (var i = 0, l = data.length; i < l; ++i) {
                if (data[i] == null) {
                    debugger;
                }
                for (var j = 0, m = data[i].length; j < m; ++j) {
                    if (range.s.r > i) {
                        range.s.r = i;
                    };
                    if (range.s.c > j) {
                        range.s.c = j;
                    };
                    if (range.e.r < i) {
                        range.e.r = i;
                    };
                    if (range.e.c < j) {
                        range.e.c = j;
                    };
                    var cell = { v: data[i][j] };
                    if (cell.v == null) {
                        continue;
                    };
                    var cell_ref = XLSX.utils.encode_cell({ c: j, r: i });
                    if (typeof cell.v === 'number') {
                        cell.t = 'n';
                    }
                    else if (typeof cell.v === 'boolean') {
                        cell.t = 'b';
                    }
                    else if (cell.v instanceof Date) {
                        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                        cell.v = dateNum(cell.v);
                    }
                    else {
                        cell.t = 's';
                    };
                    ws[cell_ref] = cell;
                };
            };
            if (range.s.c < 10000000) {
                ws['!ref'] = XLSX.utils.encode_range(range);
            };
            return ws;
        };
    }());
    return function (ds) {
        var wb = { SheetNames: [], Sheets: {} };
        for (var i = 0, j = ds.length; i < j; i++) {
            var name = "Sheet" + (i + 1);
            wb.SheetNames.push(name);
            wb.Sheets[name] = parseData(ds[i]);
        };
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
        return sab(wbout);
    };
}());
export default getExcelData;