 import React from 'react';
import { useState } from 'react'
import { Data } from './Data';
import * as XLSX from 'xlsx'


function UploadExcel() {
 
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
       
  const [excelData, setExcelData] = useState(null);

  const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  
  
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        }
      }
      else
      {
        setExcelFileError('selectionnez que le fichier excel');
        setExcelFile(null);
      }
    }
    else {
      console.log('no file seleted')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }else {
      setExcelData(null)
    }
  }
    return (
      <div className='container'>
        <div className='form'>
          <h3>
            Telechargement Data en Local
          </h3>
          <br />
          <form className='form-group' autoComplete='off' 
          onSubmit={handleSubmit}>
            <input class="form-control" type="file" 
            onChange={handleFile} required></input>
            {excelFileError && <span className='text-danger' style={{ marginTop: 5 + 'px' }}>{excelFileError}</span>}
            <br />
            <button type='submit' className='btn btn-success' style={{ marginTop: 5 + 'px' }}>Telecharger</button>
          </form>
        </div>
        <br></br>
        <hr></hr>
        <div className='viewer'>
            {excelData === null && <span>No file selected</span>}
            {excelData !== null && (
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>ID</th>
                      <th scope='col'>Nom</th>
                      <th scope='col'>Postnom</th>
                      <th scope='col'>Prenom</th>
                      <th scope='col'>CoteAnnuelle</th>
                      <th scope='col'>CoteExamen</th>
                      <th scope='col'>Moyenne</th>
                    </tr>
                  </thead>
                  <tbody>
                      <Data excelData={excelData} />
                  </tbody>
                </table>
              </div>
            )}
        </div>
        <br />
            <button type='submit' className='btn btn-success' style={{ marginTop: 5 + 'px' }}>Deployer</button>
      </div>
    ) 
}

export default UploadExcel