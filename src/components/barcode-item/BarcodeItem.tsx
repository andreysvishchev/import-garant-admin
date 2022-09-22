import React from 'react';

type PropsType = {
   barcode: string
   productTitle: string
   productId: string
   editBarcode: (barcode: string, productTitle: string, packageKey: string,  productId: string) => void
};

const BarcodeItem: React.FC<PropsType> = ({productTitle, barcode, editBarcode, productId}) => {
   return (
      <div className='barcode-item' id={barcode} onClick={()=>editBarcode( barcode, productTitle, 'pack',  productId )}>
         <div className='barcode-item__col'>{barcode}</div>
         <div className='barcode-item__col'>{productTitle}</div>
         <div className='barcode-item__col'>package</div>
      </div>
   );
};


export default BarcodeItem;