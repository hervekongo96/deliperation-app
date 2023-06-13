import {useState} from "react";
import * as XLSX from 'xlsx';



function Excel() {


//on change states
const [excelFile, setExcelFile] = useState(null);
const [typeError, setTypeError] = useState(null);

// submit state
const [excelData, setExcelData] = useState(null);


//onchange event
const handleFile = (e) => {
  let fileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv']
  let selectedFile = e.target.files[0];
  if(selectedFile){
    if(selectedFile&&fileTypes.includes(selectedFile.type)){
      setTypeError(null);
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload=(e)=>{
        setExcelFile(e.target.result);
      }
    }else{
      setTypeError('séléctionnez que le fichier du type excel');
      setExcelFile(null);
    }
  }else{
    console.log('Please select your file');
  }
}

//submit event
const handleFileSubmit=(e)=>{
  e.preventDefault();
  if(excelFile!==null){
    const workbook = XLSX.read(excelFile,{type:'buffer'});
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    setExcelData(data.slice(0,1000));
  }
}


  return (
    <div className="wrapper">
      <h3>
        Télécharegement de données en Local
      </h3>
      <br></br>
      {/* form */}

      <form className='form-group custom-form' onSubmit={handleFileSubmit}>
        <input type="file" className='form-control' required onChange={handleFile}/><br></br>
        <button type="submit" className='btn btn-success btn-md'>UPLOAD</button>
        {typeError&&(
          <>
            <br></br><div className='alert alert-danger' role="alert">{typeError}</div>
          </>
        )}
      </form><br></br>
        
      {/* view data*/}
      <div className="viewer">
        {excelData?(
          <div className='table-responsive'>
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key)=>(
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((individualExcelData, index) =>(
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key) =>(
                      <td key={key}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ):(
          <div>Pas Fiche de cotes téléchargez</div>
        )}
      </div><br></br>
      <button type="submit" className='bt2 btn btn-success btn-md'>DEPLOY</button><br></br>
    </div>
  );
}

export default Excel;
