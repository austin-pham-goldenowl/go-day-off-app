import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactExport from 'react-data-export';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ExcelFile;

const ExcelExporter = ({ sheets, downloadTriggerRef }) => (
    <ExcelFile
      element={<button ref={downloadTriggerRef} style={{ display: "none" }}>Download Data</button>}
      filename={`LEAVING_FORM_EXPORTS_${moment().locale('vi').format("DD-MM-YYYY_hh-mm-ss")}`}
    >
      { sheets.map(({ label, dataSet }, index) =>
        <ExcelSheet key={index} dataSet={dataSet} name={label || `Sheet ${index + 1}`} />)
      }
    </ExcelFile>
  );

ExcelExporter.propTypes = {
  sheets: PropTypes.array.isRequired,
  downloadTriggerRef: PropTypes.object
};

ExcelExporter.defaultProps = {
  sheets: []
};

export default ExcelExporter;
