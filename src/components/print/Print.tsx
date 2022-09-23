import React, {useRef} from 'react';
import {useReactToPrint} from 'react-to-print';

type PropsType = {
    formik: any
    rateValue: string
    code: string
    manufacturer: string
    view: string
    country: string
    mark: string
}

const Print: React.FC<PropsType> = (
    {
        formik, rateValue, code, manufacturer,
        country, mark, view
    }
) => {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <div style={{display: 'none'}}>
                <div ref={componentRef}>
                    <table className='table'>
                        <tbody>
                        <tr>
                            <th>Название поля</th>
                            <th>Значение</th>
                        </tr>
                        <tr>
                            <td>Наименование для печати</td>
                            <td>{formik.Description}</td>
                        </tr>
                        <tr>
                            <td>Рабочее наименование</td>
                            <td>{formik.НаименованиеПолное}</td>
                        </tr>
                        <tr>
                            <td>Артикул</td>
                            <td>{formik.Артикул}</td>
                        </tr>
                        <tr>
                            <td>Код</td>
                            <td>{formik.Code}</td>
                        </tr>
                        <tr>
                            <td>Ставка НДС</td>
                            <td>{rateValue}</td>
                        </tr>
                        <tr>
                            <td>Код ТН ВЭД</td>
                            <td>{code}</td>
                        </tr>
                        <tr>
                            <td>Описание</td>
                            <td>{formik.Описание}</td>
                        </tr>
                        <tr>
                            <td>Производитель</td>
                            <td>{manufacturer}</td>
                        </tr>
                        <tr>
                            <td>Марка/Бренд</td>
                            <td>{mark}</td>
                        </tr>
                        <tr>
                            <td>Вид продукции</td>
                            <td>{view}</td>
                        </tr>
                        <tr>
                            <td>Страна происхождения</td>
                            <td>{country}</td>
                        </tr>
                        <tr>
                            <td>Вес</td>
                            <td>
                                Количество шт
                                {formik.ВесЗнаменатель}
                                Вес штуки
                                {formik.ВесЧислитель}
                            </td>
                        </tr>
                        <tr>
                            <td>Обем</td>
                            <td>
                                Количество шт
                                {formik.ОбъемЗнаменатель}
                                Вес штуки
                                {formik.ОбъемЧислитель}
                            </td>
                        </tr>
                        <tr>
                            <td>Длина</td>
                            <td>
                                Количество шт
                                {formik.ДлинаЗнаменатель}
                                Вес штуки
                                {formik.ДлинаЧислитель}
                            </td>
                        </tr>
                        <tr>
                            <td>Площадь</td>
                            <td>
                                Количество шт
                                {formik.ПлощадьЗнаменатель}
                                Вес штуки
                                {formik.ПлощадьЧислитель}
                            </td>
                        </tr>
                        <tr>
                            <td>Энергетическая ценность</td>
                            <td>Будет доступно позже</td>
                        </tr>
                        <tr>
                            <td>Белки, г</td>
                            <td>Будет доступно позже</td>
                        </tr>
                        <tr>
                            <td>Углеводы, г</td>
                            <td>Будет доступно позже</td>
                        </tr>
                        <tr>
                            <td>Срок годности</td>
                            <td>Будет доступно позже</td>
                        </tr>
                        <tr>
                            <td>Состав</td>
                            <td>Будет доступно позже</td>
                        </tr>
                        <tr>
                            <td>Условия хранения</td>
                            <td>Будет доступно позже</td>
                        </tr>
                        <tr>
                            <td>Упаковка</td>
                            <td>Будет доступно позже</td>
                        </tr>
                        <tr>
                            <td>Комплектация</td>
                            <td>Будет доступно позже</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <button className='button' type={'button'} onClick={handlePrint}>Печать</button>
        </div>
    );
};

export default Print