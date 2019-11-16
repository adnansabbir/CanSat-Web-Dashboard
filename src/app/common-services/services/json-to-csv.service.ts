import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonToCsvService {

  constructor() {
  }

  convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let key in array[i]) {
        if (key) {
          if (line !== '') {
            line += ',';
          }

          line += array[i][key];
        }
      }

      str += line + '\r\n';
    }

    return str;
  };

  exportCSVFile = (headers, items, fileTitle) => {
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    const jsonObject = JSON.stringify(items);


    const csv = this.convertToCSV(jsonObject);

    const exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  convertNestedObjectArrayToFlatArrayObject = (objectArray: {}[]) => {
    const new_array = [];
    for (const object of objectArray) {
      const new_object = {};
      for (const key in object) {
        if (key) {
          if (typeof object[key] === 'object') {
            for (const sub_key in object[key]) {
              if (sub_key) {
                new_object[`${key}_${sub_key}`] = object[key][sub_key];
              }
            }
          } else {
            new_object[key] = object[key]
          }
        }
      }
      new_array.push(new_object);
      // console.log(new_object);
    }
    return new_array;
  }
}
