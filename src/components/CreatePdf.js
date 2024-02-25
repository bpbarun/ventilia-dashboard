import React, { forwardRef, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './Createpdf.scss';
import moment from 'moment';
import { IP } from './Constant';
const CreatPdf = forwardRef((props, ref) => {
    const [totalArea, setTotalArea] = useState(0);
    const [totalUnit, setTotalUnit] = useState(0);
    const [offerPrice, setOfferPrice] = useState(0);
    const [totalQuotationData, setTotalQuotationData] = useState(0);
    const [gstType, setGstType] = useState(0);
    const [gst, setGst] = useState(0);
    const [freight, setFreight] = useState(0);
    const [profile, setProfile] = useState('');
    const [hardware, setHardware] = useState('');
    const [window_quantity, setWindowQuantity] = useState('');
    const [showExtra, setShowExtra] = useState(0);
    const [glass, setGlass] = useState('');
    const today = moment();
    moment.locale('fr');
    console.log(today.format('L'));
    useEffect(() => {
        console.log('inside use effect')
        axios.get(IP + 'ventilia-api/index.php/api/leadGeneration/offerDetails/offerLetterData/' + props.id, {
            headers: {
                'token_code': localStorage.getItem("token_code"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': '*'
            }
        }).then((response) => {
            console.log('offer data is==========', response.data.data)
            setTotalArea(response.data.data[0].total_area)
            setTotalUnit(response.data.data[0].total_unit)
            setOfferPrice(response.data.data[0].offer_price)
            console.log(response.data.data[0])
            setTotalQuotationData(parseFloat(response.data.data[0].total_area) * parseFloat(response.data.data[0].offer_price))
            if(response.data.data[0].gst === '#'){
                setGst(18)
                setGstType('gst')
            }else if(response.data.data[0].gst === '*'){
                setGst(76.5)
                setGstType('value')
            }else{
                setGst(response.data.data[0].gst)
                setGstType(response.data.data[0].gstType)
            }
            setFreight(response.data.data[0].freight)
            setShowExtra(response.data.data[0].show_extra)
            setProfile(response.data.data[0].profile)
            setHardware(response.data.data[0].hardware)
            setWindowQuantity(response.data.data[0].window_quantity)
            setGlass(response.data.data[0].glass)
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const gstValue =()=>{
        let persentage = ''
        if(gstType == 'value'){
            persentage = (parseFloat(totalArea)*gst).toFixed(2)
        }else{
            persentage = ((totalQuotationData * gst) / 100).toFixed(2);
        }
        return persentage;
    }
    console.log('freight is ===',parseFloat(freight))
    return (
        <>
            <div ref={ref} className="invoice-content">
                <html>
                    <head>
                        <title>Invoice</title>
                    </head>
                    <body>
                        <div className="invoice">
                            <div className="header center">
                                <div>
                                    <img className='offer-logo'src="../assets/dist/img/logo1.png" alt="logo image" />
                                </div>
                                <h2>OFFER-LETTER</h2>
                            </div>
                            <div className="right">
                                DATE:{today.format('DD/MM/YYYY')}
                            </div>
                            <strong>To,</strong>
                            <div className="client-info">
                                <p>{props.clientName}</p>
                                <p>{props.address}</p>
                            </div>
                            <p><strong>Dear Sir,</strong></p>
                            <p><strong>Kind Attention:-</strong></p>
                            <br></br>
                            <p>We are pleased to offer you our best rates for supply and fitting of uPVC windows and door system. Below are the following terms and conditions on which we proceed further—</p>
                            <div className="terms-and-conditions">
                                <h2>Terms and Conditions:</h2>
                                <ol>
                                    <li>Final Offer rate on Dated-{today.format('DD/MM/YYYY')} is Rs.{offerPrice}/- including Installation.</li>
                                    <li>Additional GST is applicable on Total Material cost.</li>
                                    <li>Transportation & Freight: Applicable as per actual from our Indore factory to your site.</li>
                                    <li>Payment Terms:
                                        <ol type="a">
                                            <li>50% advance along with PO.</li>
                                            <li>50% amount at the time of material dispatch from our factory to your site.</li>
                                        </ol>
                                    </li>
                                    <li>Scaffolding to be arranged by client wherever needed.</li>
                                    <li>Unloading and lifting of material charges will be borne by you.</li>
                                    <li>Delivery Period: 45 days after approval of the final work order (Design & Specification).</li>
                                    <li>If in case of any changes in sizes, design type, and in glass then rates will vary accordingly. Offered prices are proposed for the below specifications only.</li>
                                    <li>The above offer letter is based on the specification of uPVC Profiles, Glass, Mesh as well as Window designs, as per shown in the final quotation, it may differ if there will be any change in the above specification of any item mentioned.</li>
                                </ol>
                            </div>
                            <div className="specifications">
                                <h2>Specifications of uPVC window:</h2>
                                <table className="table">
                                    <tr>
                                        <th>Particular</th>
                                        <th>Specification</th>
                                    </tr>
                                    <tr>
                                        <td>PROFILE</td>
                                        <td>{profile}</td>
                                    </tr>
                                    <tr>
                                        <td>WINDOW QUANTITY</td>
                                        <td>{totalUnit}</td>
                                    </tr>
                                    <tr>
                                        <td>HARDWARE</td>
                                        <td>{hardware}</td>
                                    </tr>
                                    <tr>
                                        <td>GLASS</td>
                                        <td>{glass}</td>
                                    </tr>
                                </table>
                                <br className='mynewpage'></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <table className="table">
                                    <tr>
                                        <th>Particular</th>
                                        <th>Rs./Sqft</th>
                                        <th>Area(Sqft) (Approx)</th>
                                        <th>No. of Windows (Approx)</th>
                                        <th>Amount(Rs.)</th>
                                    </tr>
                                    <tr>
                                        <td>Basic Rate</td>
                                        <td>{offerPrice}</td>
                                        <td>{totalArea}</td>
                                        <td>{totalUnit}</td>
                                        <td>Rs.{totalQuotationData.toFixed(2)}/-</td>
                                    </tr>
                                    <tr>
                                        <td>GST</td>
                                        <td>{showExtra === '1' ? 'Extra':'-'}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>Rs.{gstValue()}/-</td>
                                    </tr>
                                    <tr>
                                        <td>Freight</td>
                                        <td>{showExtra === '1' ? 'Extra':'-'}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        {parseFloat(freight) != '0'
                                        ?<td>Rs.{freight}/-</td>
                                        :<td>As per actual</td>
                                    }
                                        
                                    </tr>
                                    <tr>
                                        <td>Total Amount</td>

                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>Rs.{(parseFloat(totalQuotationData) + parseFloat(gstValue()) + parseFloat(freight)).toFixed(2)}/-</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="totals">
                                <p>** Above cost calculations have been calculated on approx sizes of windows, area and amount may vary as per the final technical measurement of the site.</p>
                            </div>
                            <div>
                                <span className="left">
                                    <p>Form Upvc Technocrats Pvt. Ltd.</p>
                                    <p>Authorized Signature</p>
                                </span>
                                <span className="right">
                                    <p>{props.clientName}</p>
                                    <p>Authorized Signature</p>
                                </span>
                            </div>
                        </div>
                    </body>
                </html>
            </div>
        </>
    )
})
export default CreatPdf;