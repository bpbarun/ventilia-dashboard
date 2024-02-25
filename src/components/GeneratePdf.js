import React, { forwardRef, useRef } from "react";
// import ReactToPrint from "react-to-print";
import CreatPdf from "./CreatePdf";
import { useReactToPrint } from 'react-to-print';
const GeneratePdf = (props) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    return (
        <>
            <div>
                <CreatPdf ref={componentRef} clientName={props.clientName} address={props.address} id={props.id}/>
                <button className="print-btn" type="button" onClick={handlePrint}>Print this out!</button>
            </div>
        </>
    )
}
export default GeneratePdf;