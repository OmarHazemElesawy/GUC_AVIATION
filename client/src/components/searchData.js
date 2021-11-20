import React  from 'react';
export default function searchData() {
    var flight=JSON.stringify(JSON.parse(localStorage.getItem('flight')));
    return(
        <div>
            {flight}
        </div>
    )
    }
