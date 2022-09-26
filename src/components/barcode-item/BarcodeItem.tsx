import React, {memo} from 'react';

type PropsType = {
   barcode: string
   productTitle: string
   productId: string
   editBarcode: (barcode: string, productTitle: string, packageKey: string,  productId: string) => void
};

const BarcodeItem: React.FC<PropsType> = memo( ({productTitle, barcode, editBarcode, productId}) => {
   // onClick={()=>editBarcode( barcode, productTitle, 'pack',  productId )}
   return (
      <div className='barcode-item' id={barcode}>
         <div className='barcode-item__col'>{barcode}</div>
         <div className='barcode-item__col'>{productTitle}</div>
      </div>
   );
});


export default BarcodeItem;