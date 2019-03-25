export const formatColumns = columns => Array.isArray(columns) ?
  columns.map(({ columnName, columnWidth = 250,
    style = {
      font: { name: "Arial", sz: "13",  vertAlign: true, },
      border: {
        top: { style: 'thin', color: { rgb: 'FF000000' }, },
        left: { style: 'thin', color: { rgb: 'FF000000' }, },
        right: { style: 'thin', color: { rgb: 'FF000000' }, },
        bottom: { style: 'thin', color: { rgb: 'FF000000' }, },
      },
    }, ...rest }, index) => ({
      style,
      width: { wpx: columnWidth },
      title: columnName || `Column ${index + 1}`,
      ...rest
    })) : [];

export const formatRow = row => Array.isArray(row) ?
  row.map(({ value = "", 
    style = {
      font: { name: "Arial", sz: "13", },
      border: {
        top: { style: 'thin', color: { rgb: 'FF000000' }, },
        left: { style: 'thin', color: { rgb: 'FF000000' }, },
        right: { style: 'thin', color: { rgb: 'FF000000' }, },
        bottom: { style: 'thin', color: { rgb: 'FF000000' }, },
      },
    } 
  }) => ({ value, style })) : [];