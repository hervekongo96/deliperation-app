import React from "react"
import {UploadData} from './UploadData'

export const Data = ({excelData}) => {
    return excelData.map((excelData)=>{
        <tr key={excelData.Id}>
            <UploadData excelData={excelData}/>  
        </tr>
    })
}