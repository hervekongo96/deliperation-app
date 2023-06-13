import React from "react";

export const UploadData = ({excelData}) => {
    return (
        <div>
            <th>{excelData.Id}</th>
            <th>{excelData.Nom}</th>
            <th>{excelData.Postnom}</th>
            <th>{excelData.Prenom}</th>
            <th>{excelData.CoteAnnuelle}</th>
            <th>{excelData.CoteExamen}</th>
            <th>{excelData.Moyen}</th>        
        </div>
    )
}