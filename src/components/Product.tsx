import React from 'react';

type DataType = {
    name: string
    categories: any[]
}
type PropsType = {
    data: DataType
}


const Product: React.FC<PropsType> = ({data}) => {
    return (
        <div>
            {data.categories.map(el => {
                return (
                    <div className='product'>{el.name}</div>
                )
            })}

        </div>
    );
};

export default Product;