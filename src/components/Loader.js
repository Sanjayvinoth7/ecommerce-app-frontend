
import React, { useState } from 'react'
import SyncLoader from "react-spinners/SyncLoader";
function Loader() {
    let [loading, setLoading] = useState(true);

    return (
        <div className='loader'>
        <div className="sweet-loading">


            <SyncLoader color='#000' loading={loading} css='' size={30}/>
        </div></div>
    )
}

export default Loader